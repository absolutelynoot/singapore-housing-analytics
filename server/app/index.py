from app import app
from flask import jsonify

@app.route("/")
def index():
    return "Singapore Housing Data Backend Application is working" 

