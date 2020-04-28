from flask import send_from_directory, jsonify
from flask_restful import Resource, request, reqparse
import os
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from core import app

ErrorFile = "error.png"
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


parser = reqparse.RequestParser()
parser.add_argument('file', type=FileStorage, location='files')


class Image(Resource):
    def get(self, file_name):
        print(app.config['UPLOAD_FOLDER'], file_name)
        try:
            return send_from_directory(app.config['UPLOAD_FOLDER'], file_name)
        except Exception:
            return send_from_directory(app.config['UPLOAD_FOLDER'], ErrorFile)

    def post(self, file_name):
        data = parser.parse_args()
        if 'file' not in data or not data['file']:
            resp = jsonify({'message': 'No file part in the request'})
            resp.status_code = 400
            return resp
        file = data['file']
        print(file)
        if file and file.filename == '':
            resp = jsonify({'message': 'No file selected for uploading'})
            resp.status_code = 400
            return resp
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            resp = jsonify({'filename': filename})
            resp.status_code = 201
            return resp
        else:
            resp = jsonify(
                {'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
            resp.status_code = 400
            return resp
