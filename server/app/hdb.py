from app import app
from flask import jsonify
import requests
from pymongo import MongoClient
import certifi
import sys

# url = "https://data.gov.sg/api/action/datastore_search"
# params = {
#     "resource_id":"f1765b54-a209-4718-8d38-a39237f502b3"
# }

@app.route("/hdb/")
def testHdb():
    try:
        response = mycol.find_one()
        return (response), 200
    
    except:
        return 'Failed to connect to MongoDB'

@app.route("/hdb/price")
def get_hdb_price():

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        return jsonify(data), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route("/hdb/all")
def get_hdb_all():

    all_records = []

    offset = 0

    try:

        while(True):

            response = requests.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            if(len(data["result"]["records"])>0):
                all_records.append(data["result"]["records"])
                params["offset"] += 100
                print(params["offset"])
            else:
                break

        return jsonify(all_records), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.route("/hdb/<string:q>")
def get_hdb_query(q: str):

    try:

        params["q"] = q

        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        return jsonify(data), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
