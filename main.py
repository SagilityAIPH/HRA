# from threading import Timer
# import webbrowser
import eventlet
eventlet.monkey_patch()

from website import create_app, socketio
# import ssl

# cert_file = 'certificate.pem'
# key_file = 'private_key.pem'
# context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
# context.load_cert_chain(certfile=cert_file, keyfile=key_file)


#ssh -i carj.concepcion.pem carj.concepcion@54.159.96.180
#ssh -i HRA_key2.pem ubuntu@34.231.20.104
#HRA_Env\scripts\activate.ps1 - evironment
#cd STT
#source STTVenv/bin/activate

# app = create_app()
# if __name__ == '__main__':

#     app = create_app() 
#     def open_browser():
#         webbrowser.open_new("http://127.0.0.1:5000/")
    
#     #Timer(1, open_browser).start()
#     socketio.run(app, host="0.0.0.0", port=5000,  ssl_context=context, allow_unsafe_werkzeug=True)#host="0.0.0.0",port=5000,debug=True ssl_context=context,  allow_unsafe_werkzeug=True


app = create_app()

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000)
