from app import app
from flask import jsonify

@app.route("/hdb/")
def testHdb():
    return "hdb data application is working" 


