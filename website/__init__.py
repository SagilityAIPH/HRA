from flask import Flask
from flask_socketio import SocketIO
socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = "NPLPython"
    

    from .views import views
    from .auth import auth
    
    socketio.init_app(app) 

    app.register_blueprint(views,url_prefix='/')
    app.register_blueprint(auth,url_prefix='/')
    
    return app