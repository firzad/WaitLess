from core.views import app
from core import socketio
import os

basepath = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = 'static'
app.config['UPLOAD_FOLDER'] = os.path.join(basepath,UPLOAD_FOLDER)


if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0')
