from app import app
from flask import jsonify

@app.route("/")
def index():
    return "<h1>Singapore Housing Data Backend Application is working</h1>" 

