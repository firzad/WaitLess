import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from sqlalchemy import MetaData



app = Flask(__name__)
app.config.from_object('config.DevelopmentConfig')
app.config['BASE_URL'] = "http://localhost:5000"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://{user}:{passwd}@{host}:5432/{db}'.format(
        user="postgres",
        passwd="password",
        host="postgres",
        db="Waitless"
    )

socketio = SocketIO(app, cors_allowed_origins="*")

db = SQLAlchemy(app)

CORS(app, resources={r"/*": {"origins": "*"}})
