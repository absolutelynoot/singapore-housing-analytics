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
    

# @app.route("/hdb/1")
# def get_hdb_one():
#     try:
#         cur = mycol.find({})
#         list_cur = list(cur)[0]
#         return jsonify(list_cur)
    
#     except:
#         return 'Failed to connect to MongoDB'


@app.route("/hdb/<string:address>")
def get_hdb_by_town(address):
    try:

        if address == "KALLANG_WHAMPOA":
            address = "/".join(address.split("_"))
        else:
            address = " ".join(address.split("_"))

        cur = mycol.find(
            { "town": address },
                {
                    "address": 1,
                    "town": 1,
                    "resale_price": 1,
                    "flat_model": 1,
                    "flat_type": 1,
                    "month": 1,
                    "floor_area_sqm": 1
                }
            )
        
        # cur = mycol.distinct("town")
        list_cur = list(cur)
        
        # return jsonify(list_cur)
        
        max_address = list_cur[0]["address"]
        maximum_price = list_cur[0]["resale_price"]
        max_flat_model = list_cur[0]["flat_model"]
        max_flat_type = list_cur[0]["flat_type"]
        max_month = list_cur[0]["month"]
        max_floor_area_sqm = list_cur[0]["floor_area_sqm"]
        
        min_address = list_cur[0]["address"]
        minimum_price = list_cur[0]["resale_price"]
        min_flat_model = list_cur[0]["flat_model"]
        min_flat_type = list_cur[0]["flat_type"]
        min_month = list_cur[0]["month"]
        min_floor_area_sqm = list_cur[0]["floor_area_sqm"]
        
        for each in list_cur:
            if float(each["resale_price"]) < float(minimum_price):
                minimum_price = each["resale_price"]
                min_address = each["address"]
                min_flat_model = each["flat_model"]
                min_flat_type = each["flat_type"]
                min_month = each["month"]
                min_floor_area_sqm = each["floor_area_sqm"]
                
            elif float(each["resale_price"]) > float(maximum_price):
                max_address = each["address"]
                maximum_price = each["resale_price"]
                max_flat_model = each["flat_model"]
                max_flat_type = each["flat_type"]
                max_month = each["month"]
                max_floor_area_sqm = each["floor_area_sqm"]

        results = {
            "max_address": max_address,
            "maximum_price": maximum_price,
            "max_flat_model": max_flat_model,
            "max_flat_type": max_flat_type,
            "max_month": max_month,
            "max_floor_area_sqm": max_floor_area_sqm,
            
            "min_address": min_address,
            "minimum_price": minimum_price,
            "min_flat_model": min_flat_model,
            "min_flat_type": min_flat_type,
            "min_month": min_month,
            "min_floor_area_sqm": min_floor_area_sqm,

            "town": address
        }
        
        return jsonify(results), 200
    
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

                    # If not, create a new dictionary for it
                    result[lease_bins] = {
                        'Lease Bins': lease_bins,
                        'EXECUTIVE': 0,
                        'EXECUTIVEColor': 'hsl(230, 70%, 50%)',
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
                # Update the corresponding flat type with the average resale price
                result[lease_bins][flat_type] = round(avg_resale_price_sqm,2)
            

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
    

@app.route("/hdb/avg_price_sqm_by_house_type")
def get_avg_price_sqm_by_house_type():
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
                "_id": "$flat_type",
                "avg_resale_price_sqm": { "$avg": "$avg_resale_price_sqm" }
                }
            }
        ])
        
        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    
@app.route("/hdb/total_units_sold")
def get_total_units_sold():
    try:

        cur = mycol.aggregate([
            {
                "$group": {
                "_id": "$flat_type",
                "total_units_sold": { "$sum": 1 }
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    

@app.route("/hdb/most_expensive_units_sold_by_house_type")
def get_most_expensive_unit_sold_by_house_type():
    try:

        cur = mycol.aggregate([
            {
                "$sort": {
                    "resale_price": -1
                }
            },
            {
                "$group": {
                "_id": "$flat_type",
                "most_expensive_unit_sold": { 
                        "$first": {
                            "resale_price": "$resale_price",
                            "town": "$town",
                            "street_name": "$street_name",
                            "flat_model": "$flat_model",
                            "floor_area_sqm": "$floor_area_sqm",
                            "remaining_lease": "$remaining_lease"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    

@app.route("/hdb/cheapest_units_sold_by_house_type")
def get_cheapest_unit_sold_by_house_type():
    try:

        cur = mycol.aggregate([
            {
                "$sort": {
                "resale_price": 1
                }
            },
            {
                "$group": {
                "_id": "$flat_type",
                "cheapest_unit_sold": { 
                        "$first": {
                            "resale_price": "$resale_price",
                            "town": "$town",
                            "street_name": "$street_name",
                            "flat_model": "$flat_model",
                            "floor_area_sqm": "$floor_area_sqm",
                            "remaining_lease": "$remaining_lease"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "_id": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    

@app.route("/hdb/most_expensive_unit_by_town")
def get_most_expensive_unit_by_town():
    try:

        cur = mycol.aggregate([
            {
                "$sort": {
                    "resale_price": -1
                }
            },
            {
                "$group": {
                "_id": "$town",
                "most_expensive_unit_sold": { 
                        "$first": {
                            "resale_price": "$resale_price",
                            "flat_type": "$flat_type",
                            "street_name": "$street_name",
                            "flat_model": "$flat_model",
                            "floor_area_sqm": "$floor_area_sqm",
                            "remaining_lease": "$remaining_lease"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "resale_price": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'


@app.route("/hdb/cheapest_unit_by_town")
def get_cheapest_unit_by_town():
    try:

        cur = mycol.aggregate([
            {
                "$sort": {
                "resale_price": 1
                }
            },
            {
                "$group": {
                "_id": "$town",
                "cheapest_unit_sold": { 
                        "$first": {
                            "resale_price": "$resale_price",
                            "flat_type": "$flat_type",
                            "street_name": "$street_name",
                            "flat_model": "$flat_model",
                            "floor_area_sqm": "$floor_area_sqm",
                            "remaining_lease": "$remaining_lease"
                        }
                    }
                }
            },
            {
                "$sort": {
                    "resale_price": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    
@app.route("/hdb/average_price_sqm_by_town")
def get_average_price_sqm_by_town():
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
            },
            {
                "$sort": {
                    "avg_resale_price_sqm": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    
@app.route("/hdb/average_price_sqm_by_storey_range")
def get_average_price_sqm_by_storey_range():
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
                "_id": "$storey_range",
                "avg_resale_price_sqm": { "$avg": "$avg_resale_price_sqm" }
                }
            },
            {
                "$sort": {
                    "avg_resale_price_sqm": 1
                }
            }
        ])

        list_cur = list(cur)

        response = {"Result": list_cur}

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
