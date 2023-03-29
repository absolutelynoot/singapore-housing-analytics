from app import app
from flask import jsonify
import requests
from pymongo import MongoClient
import certifi
import hashlib

client = MongoClient(app.config["MONGO_URI"], tlsCAFile=certifi.where())
mydb = client["housing"]
mycol = mydb["hdb_prices"]

@app.route("/hdb/")
def get_hdb_all():
    try:
        cur = mycol.find({})
        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'

@app.route("/hdb/total_transactions_over_months")
def get_hdb_total_transactions_over_months():
    try:
        cur = mycol.aggregate([
                {
                    "$group" : {
                        "_id" : { "date": "$month" } ,
                    "total": { "$sum": 1 }
                    }
                }
                ])
        
        temp = []
        temp_dict = {}

        for item in cur:
            temp_dict = {"x" : item['_id']['date'], "y" : item['total']}
            temp.append(temp_dict)

        response = [{'id': 'Singapore',
                    "color": "hsl(283, 70%, 50%)",
                    "data": temp}]
        
        # Sort the data list based on the "x" key in the "data" list
        response[0]["data"] = sorted(response[0]["data"], key=lambda d: d["x"])

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'

@app.route("/hdb/town_vs_avg_price")
def get_hdb_town_vs_avg_price():
    try:
        cur = mycol.aggregate([
            {
                "$addFields": {
                "resale_price_double": { "$toDouble": "$resale_price" },
                "floor_area_sqm_double": { "$toDouble": "$floor_area_sqm" }
                }
            },
            {
                "$addFields": {
                "avg_resale_price_sqm": { "$divide": [ "$resale_price_double", "$floor_area_sqm_double" ] }
                }
            },
            {
                "$group": {
                "_id": "$town",
                "avg_resale_price_sqm": { "$avg": "$avg_resale_price_sqm" }
                }
            }
            ])
        
        temp = []
        temp_dict = {}

        for item in cur:
            temp_dict = {"town" : item['_id'], "avg_resale_price_sqm" : round(item['avg_resale_price_sqm']), "priceColor": "hsl(283, 70%, 50%)"}
            temp.append(temp_dict)
        
        #  Sort the data list based on the "x" key in the "data" list
        response = sorted(temp, key=lambda x: x["avg_resale_price_sqm"], reverse=True)

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'

@app.route("/hdb/lease_data")
def get_lease_data():
    try:
        # mycol = 
        cur = mydb["hdb_lease_grouped"].aggregate([
                {
                    "$group": {
                    "_id": {   
                            "lease_bins": "$lease_bins",
                            "flat_type": "$flat_type"
                    },
                    "avg_resale_price_sqm": { "$avg": "$resale_price_per_sqm" }
                }
                }
            ])

        # Create a dictionary to store the transformed data
        result = {}
        # Iterate over each dictionary in the list
        for d in list(cur):
            # Get the lease commence date and flat type
            lease_bins = d['_id']['lease_bins']
            flat_type = d['_id']['flat_type']

            # Get the average resale price per square meter
            avg_resale_price_sqm = d['avg_resale_price_sqm']

            # Check if the lease commence date is already in the result dictionary
            if (type(lease_bins) == str):
                if lease_bins not in result:
                    # print(f"{lease_bins}, the type of lease_bins is {type(lease_bins)}\n")

                    # If not, create a new dictionary for it
                    result[lease_bins] = {
                        'Lease Bins': lease_bins,
                        'EXECUTIVE': 0,
                        'EXECUTIVEColor': 'hsl(293, 70%, 50%)',
                        'MULTI-GENERATION': 0,
                        'MULTI-GENERATIONColor': 'hsl(293, 70%, 50%)',
                        '5 ROOM': 0,
                        '5 ROOMColor': 'hsl(285, 70%, 50%)',
                        '4 ROOM': 0,
                        '4 ROOMColor': 'hsl(10, 70%, 50%)',
                        '3 ROOM': 0,
                        '3 ROOMColor': 'hsl(241, 70%, 50%)',
                        '2 ROOM': 0,
                        '2 ROOMColor': 'hsl(259, 70%, 50%)',
                        '1 ROOM': 0,
                        '1 ROOMColor': 'hsl(270, 70%, 50%)',
                    }
                # print(f"\nCREATED NEW DICTIONARY FOR LEASE BIN: {result[lease_bins]}\n")
                # Update the corresponding flat type with the average resale price
                result[lease_bins][flat_type] = avg_resale_price_sqm
                # print(f"\nUPDATED LEASE BIN NUMBERS: {result[lease_bins]}\n")
            
        # print(f"\nTHE FINAL RESULT IS: \n{result}\n")

        # Convert the dictionary to a list
        response = list(result.values())
        
        #  Sort the lease bins list based on the "Lease Bins" key in the "data" list
        response = sorted(response, key=lambda x: x["Lease Bins"], reverse=False)

        # return jsonify(response), 200
        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    
@app.route("/hdb/room_town_avg_price_over_months")
def get_room_town_avg_price_over_months():
    try:
        cur = mycol.aggregate([
                {
                    "$addFields": {
                    "resale_price_double": { "$toDouble": "$resale_price" },
                    "floor_area_sqm_double": { "$toDouble": "$floor_area_sqm" }
                }
                },
                {
                    "$addFields": {
                    "avg_resale_price_sqm": { "$divide": [ "$resale_price_double", "$floor_area_sqm_double" ] }
                }
                },
                {
                    "$group": {
                    "_id": {
                            "date": "$month",
                            "town": "$town",
                            "flat_type": "$flat_type"
                    },
                    "avg_resale_price_sqm": { "$avg": "$avg_resale_price_sqm" }
                }
                }
            ])
        
        # Create a dictionary to store the data in the desired format
        converted_data = {}

        # Loop through the original data
        for d in cur:
            # Get the relevant fields from the original data
            date = d["_id"]["date"]
            flat_type = d["_id"]["flat_type"]
            town = d["_id"]["town"]
            avg_resale_price_sqm = d["avg_resale_price_sqm"]
            
            # Create an ID for the data point
            id = town + ' ' + flat_type
            # Generate a unique integer for the town name using a hash function
            town_hash = int(hashlib.sha256(town.encode('utf-8')).hexdigest(), 16) % 10**8
    
            # Use the town hash to generate a unique color
            color = "hsl({}, 70%, 50%)".format(town_hash % 360)

            # Create a new data point in the converted data dictionary
            if id not in converted_data:
                converted_data[id] = {
                    "id": id,
                    "color": color,
                    "data": []
                }
            
            # Add the current data point to the relevant data array in the converted data dictionary
            converted_data[id]["data"].append({"x": date, "y": avg_resale_price_sqm})

        # Convert the dictionary to a list and sort by ID
        converted_data = list(converted_data.values())
        # converted_data.sort(key=lambda x: x["id"])

        # Print the converted data
        # print(converted_data)

        # Sort the data list based on the "x" key in the "data" list
        for data in converted_data:
            data["data"] = sorted(data["data"], key=lambda d: d["x"])
        # converted_data[0]["data"] = sorted(converted_data[0]["data"], key=lambda d: d["x"])

        return jsonify(converted_data), 200
    
    except:
        return 'Failed to connect to MongoDB'