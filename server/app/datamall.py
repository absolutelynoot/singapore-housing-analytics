from app import app
from flask import jsonify
import requests

#Authentication parameters
headers = {
    'AccountKey': str(app.config["DATAMALL_API_KEY"]),
    'accept': 'application/json'
}

class DataMall():
    #API parameters
    uri = 'http://datamall2.mytransport.sg'
    busStopPath = '/ltaodataservice/BusStops'


@app.route("/datamall/")
def testDatamall():
    return "datamall data application is working"

@app.route("/datamall/bus_stops")
def getBusStops():

    try:
        response = requests.get(DataMall.uri + DataMall.busStopPath, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify(data), 200

    except Exception as e:
        return jsonify(error=str(e)), 500
   