from app import app
from flask import jsonify
import requests
from pymongo import MongoClient
import certifi

# client = MongoClient("mongodb+srv://group8:0000@housing.de7eplv.mongodb.net/?retryWrites=true&w=majority", tlsCAFile=certifi.where())
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
            print(item)
            temp_dict = {"town" : item['_id'], "avg_resale_price_sqm" : round(item['avg_resale_price_sqm']), "priceColor": "hsl(283, 70%, 50%)"}
            temp.append(temp_dict)
        
        #  Sort the data list based on the "x" key in the "data" list
        response = sorted(temp, key=lambda x: x["avg_resale_price_sqm"], reverse=True)

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    
@app.route("/hdb/lease_data")
def get_lease_data():
    print("======= get_lease_data RUNNING ========")
    try:
        cur = mycol.find({})
        list_cur = list(cur)

        lease_bins = {
                        "94-90 years": [], 
                        "89-85 years": [],
                        "84-80 years": [],
                        "79-75 years": [],
                        "74-70 years": [],
                        "69-65 years": [],
                        "64-60 years": [],
                        "59-55 years": [] 
                    }
        
        flat_types = [
                        "EXECUTIVE",
                        "MULTI-GENERATION",
                        "5 ROOM",
                        "4 ROOM",
                        "3 ROOM",
                        "2 ROOM",
                        "1 ROOM"
                    ]

        # Loop through each document and sort them into the lease bins
        for doc in list_cur:
            # print(doc)
            flat_type = doc["flat_type"]
            lease = int(doc['remaining_lease'][:2])
            if 90 <= lease <= 94:
                lease_bins["94-90 years"].append(doc)
            elif 85 <= lease <=89:
                lease_bins["89-85 years"].append(doc)
            elif 80 <= lease <=84:
                lease_bins["89-85 years"].append(doc)
            elif 75 <= lease <= 79:
                lease_bins["79-75 years"].append(doc)
            elif 70 <= lease <= 74:
                lease_bins["74-70 years"].append(doc)
            elif 65 <= lease <= 69:
                lease_bins["69-65 years"].append(doc)
            elif 60 <= lease <= 64:
                lease_bins["64-60 years"].append(doc)
            elif 55 <= lease <= 59:
                lease_bins["59-55 years"].append(doc)

        output_data = [lease_bins]
        temp_dict={}

        for key in lease_bins:
            print("Doing lease bin: " + key)
            print(len(lease_bins[key]))

            temp_resale_dict = {}
            for flat_type in flat_types:
                print(flat_type)
                count = 0
                total_resale_price = 0
                for data in lease_bins[key]:
                    if data['flat_type'] == flat_type:
                        total_resale_price += int(data['resale_price'])
                        # CODE STOPS WORKING HERE, 94-90 YEARS 5 ROOM FLAT
                        count+=1
                        print(total_resale_price, count)
                if count > 0:
                    avg_resale_price = total_resale_price / count
                    temp_resale_dict[flat_type] = avg_resale_price
                    print("The average resale value for flat type " + flat_type + " is " + avg_resale_price)
                else:
                    temp_resale_dict[flat_type] = 0
                    print("No resale houses for flat type: " + flat_type)

            temp_dict = {
                "Lease Bins": key,
                "EXECUTIVE": temp_resale_dict['EXECUTIVE'],
                "EXECUTIVEColor": "hsl(293, 70%, 50%)",
                "MULTI-GENERATION": temp_resale_dict['MULTI-GENERATION'],
                "MULTI-GENERATION": "hsl(293, 70%, 50%)",
                "5 ROOM": temp_resale_dict['5 ROOM'],
                "5 ROOMColor": "hsl(285, 70%, 50%)",
                "4 ROOM": temp_resale_dict['4 ROOM'],
                "4 ROOMColor": "hsl(10, 70%, 50%)",
                "3 ROOM": temp_resale_dict["3 ROOM"],
                "3 ROOMColor": "hsl(241, 70%, 50%)",
                "2 ROOM": temp_resale_dict["2 ROOM"],
                "2 ROOMColor": "hsl(259, 70%, 50%)",
                "1 ROOM": temp_resale_dict["1 ROOM"],
                "1 ROOMColor": "hsl(270, 70%, 50%)"
            }
            print(temp_dict)

            output_data.append(temp_dict)
        
        print(lease_bins["94-90 years"][0])
        
        response = {"Result": [output_data]}

        return jsonify(response), 200
    except:
        return 'Failed to connect to MongoDB'
