from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from os import environ
from dotenv import load_dotenv
import requests

load_dotenv()

# user = environ.get('user') or "placeholderuser"
# password = environ.get('password') or "placeholderpassword"

# DB_HOSTNAME = environ.get('DB_HOSTNAME')
# DB_USERNAME = environ.get('DB_USERNAME')
# DB_PASSWORD = environ.get('DB_PASSWORD')
# DB_NAME = environ.get('DB_NAME')

app = Flask(__name__)
CORS(app)
app.config['DATAMALL_API_KEY'] = environ.get('DATAMALL_API_KEY')
app.config['URA_API_KEY'] = environ.get('URA_API_KEY')
app.config['URA_TOKEN'] = environ.get('URA_TOKEN')

from .index import *
from .hdb import *
from .datamall import *
from .ura import *