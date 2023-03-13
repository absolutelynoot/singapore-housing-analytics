from app import app
from flask import jsonify
import requests

url = "https://data.gov.sg/api/action/datastore_search?resource_id=f1765b54-a209-4718-8d38-a39237f502b3"

@app.route("/hdb/")
def testHdb():
    return "hdb data application is working" 

@app.route("/hdb/price")
def get_hdb_price():
    try:
        response = requests.get(url)
        response.raise_for_status()

        return jsonify(response.json()), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
