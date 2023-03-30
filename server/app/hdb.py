from app import app
from flask import jsonify
import requests
from pymongo import MongoClient
import certifi

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
        address = " ".join(address.split("_"))
        cur = mycol.find(
            {},
                {
                    "address": 1,
                    "town": address,
                    "resale_price": 1,
                    "flat_model": 1,
                    "flat_type": 1,
                    "month": 1,
                    "floor_area_sqm": 1
                }
            )
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