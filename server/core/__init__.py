import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO


UPLOAD_FOLDER = 'files/'
app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

socketio = SocketIO(app, cors_allowed_origins="*")

db = SQLAlchemy(app)
CORS(app, resources={r"/*": {"origins": "*"}})
