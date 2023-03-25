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
        
        lease_bins = {"94-90 years": [], "89-85 years": [], "84-80 years": [], "79-75 years": [], "74-70 years": [], "69-65 years": [], "64-60 years": [], "59-55 years": [] }
        
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

        output_data = []
        temp_dict={}

        for key in lease_bins:
            print("Doing lease bin: " + key)
            # countE = 0
            # countM = 0
            # count5 = 0
            # count4 = 0
            # count3 = 0
            # count2 = 0
            # count1 = 0
            # avg_resale = {"EXECUTIVE": 0, "1 ROOM": 0, "2 ROOM": 0, "MULTI-GENERATION": 0, "3 ROOM": 0, "4 ROOM": 0, "5 ROOM": 0}
            
            # for x in lease_bins[key]:
            #     # print(x)
            #     if x['flat_type'] == "EXECUTIVE":
            #         avg_resale['EXECUTIVE'] += int(x['resale_price'])
            #         countE += 1
            #     elif x['flat_type'] == "1 ROOM":
            #         avg_resale['1 ROOM'] += int(x['resale_price'])
            #         count1 += 1
            #     elif x['flat_type'] == "2 ROOM":
            #         avg_resale['2 ROOM'] += int(x['resale_price'])
            #         count2 += 1
            #     elif x['flat_type'] == "MULTI-GENERATION":
            #         avg_resale['MULTI-GENERATION'] += int(x['resale_price'])
            #         countM += 1
            #     elif x['flat_type'] == "3 ROOM":
            #         avg_resale['3 ROOM'] += int(x['resale_price'])
            #         count3 += 1
            #     elif x['flat_type'] == "4 ROOM":
            #         avg_resale['4 ROOM'] += int(x['resale_price'])
            #         count4 += 1
            #     # elif x['flat_type'] == "5 ROOM":
            #     else:
            #         avg_resale['5 ROOM'] += int(x['resale_price'])
            #         count5 += 1

            # print("LOOP ENDED, reached here")
            # if countE != 0:
            #     avg_resale['EXECUTIVE'] /= countE
            # if count1 != 0:
            #     avg_resale['1 ROOM'] /= count1
            # if count2 != 0:
            #     avg_resale['2 ROOM'] /= count2
            # if countM != 0:
            #     avg_resale['MULTI-GENERATION'] /= countM
            # if count3 != 0:
            #     avg_resale['3 ROOM'] /= count3
            # if count4 != 0:
            #     avg_resale['4 ROOM'] /= count4
            # if count5 != 0:
            #     avg_resale['5 ROOM'] /= count5

            flat_resale_value = {"EXECUTIVE": 0, "5 ROOM": 0, "4 ROOM": 0, "3 ROOM": 0, "2 ROOM": 0}
            flat_type_count = {"EXECUTIVE": 0, "5 ROOM": 0, "4 ROOM": 0, "3 ROOM": 0, "2 ROOM": 0}

            for doc in lease_bins[key]:
                flat_type = doc["flat_type"]
                print(flat_type)
                resale_price = int(doc["resale_price"])
                print(resale_price)
                flat_resale_value[flat_type] += resale_price
                flat_type_count[flat_type] += 1
           
            print(flat_resale_value)
            print(flat_type_count)

            for flat_type in flat_resale_value:
                if flat_type_count[flat_type] != 0:
                    avg_resale_price = flat_resale_value[flat_type] / flat_type_count[flat_type]
                    print("Average resale price for", flat_type, ":", avg_resale_price)


            temp_dict = {
                "Lease Bins": key,
                "EXECUTIVE": avg_resale['EXECUTIVE'],
                "EXECUTIVEColor": "hsl(293, 70%, 50%)",
                "MULTI-GENERATION": avg_resale['MULTI-GENERATION'],
                "MULTI-GENERATION": "hsl(293, 70%, 50%)",
                "5 ROOM": avg_resale['5 ROOM'],
                "5 ROOMColor": "hsl(285, 70%, 50%)",
                "4 ROOM": avg_resale['4 ROOM'],
                "4 ROOMColor": "hsl(10, 70%, 50%)",
                "3 ROOM": avg_resale["3 ROOM"],
                "3 ROOMColor": "hsl(241, 70%, 50%)",
                "2 ROOM": avg_resale["2 ROOM"],
                "2 ROOMColor": "hsl(259, 70%, 50%)",
                "1 ROOM": avg_resale["1 ROOM"],
                "1 ROOMColor": "hsl(270, 70%, 50%)"
            }
            print(temp_dict)

            output_data.append(temp_dict)
        
        # print(lease_bins["94-90 years"][0])
        
        response = {"Result": [output_data]}

        return jsonify(response), 200
    except:
        return 'Failed to connect to MongoDB'
