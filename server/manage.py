from core.views import app
from core import socketio


if __name__ == '__main__':
    # app.run()
    socketio.run(app)
