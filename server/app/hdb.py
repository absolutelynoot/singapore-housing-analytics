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
            temp_dict = {"town" : item['_id'], "avg_resale_price_sqm" : round(item['avg_resale_price_sqm']), "priceColor": "hsl(283, 70%, 50%)"}
            temp.append(temp_dict)
        
        #  Sort the data list based on the "x" key in the "data" list
        response = sorted(temp, key=lambda x: x["avg_resale_price_sqm"], reverse=True)

        return jsonify(response), 200
    
    except:
        return 'Failed to connect to MongoDB'
    