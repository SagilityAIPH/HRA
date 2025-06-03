from flask import Blueprint, render_template, request,session, jsonify,current_app
#from flashtext import KeywordProcessor
from flask_socketio import SocketIO, emit
from website import socketio
from pymongo import MongoClient
from bson import ObjectId
views = Blueprint('views', __name__)

client = MongoClient("mongodb+srv://carjgilson:hraAdmin@hra.msyxf.mongodb.net/?retryWrites=true&w=majority&appName=HRA")
db = client["HRA"]
collection = db["HRA_Data"]


@views.route('/')
def home():
    return render_template('hra_login.html')

@views.route('/hra', methods=['GET', 'POST'])
def hra():
    firstName = request.args.get('first_name') or request.form.get('first_name')
    lastName = request.args.get('last_name') or request.form.get('last_name')
    fullname = f"{firstName} {lastName}"
    return render_template('HRA_SMS.html', full_name=fullname)

@views.route("/submitQuestions", methods=['GET', 'POST'])
def submitQuestion():
    data = request.get_json()
    name = data.get('name')
    question1 = data.get('question1', [])
    question2 = data.get('question2')
    question3 = data.get('question3', [])
    question4 = data.get('question4')
    question5 = data.get('question5')
    question6 = data.get('question6')
    question7 = data.get('question7')

    form_data = {
        "_id": 1,
        "name": name,
        "question1": question1,
        "question2": question2,
        "question3": question3,
        "question4": question4,
        "question5": question5,
        "question6": question6,
        "question7": question7
    }
 
    try:
        collection.insert_one(form_data)
       
        return jsonify({"Success": True })
    except Exception as e:
        return jsonify({"Success": False, "error": str(e)})
    
@views.route("/updateQuestions", methods=['GET', 'POST'])
def updateQuestion():
   
    query = {"_id": 1}
    updateField = {
        "$set": {
            "name": "ngao1 ngao1",
            "question7": "i am question 7"
        }
    }

    try:
        result = collection.update_one(query, updateField)
        if result.matched_count > 0:
            print("Ngao updated")
            return jsonify({"message": "Update successful" })
        else:
            return jsonify({"message": "Update failed" })
        
    except Exception as e:
        return jsonify({"Failed": False, "error": str(e)})

@views.route("/loadQuestions", methods=['GET', 'POST'])
def loadQuestion():
    data = request.get_json()
    idQ = data.get('idQ')
    
    try:
        object_id = ObjectId(idQ)
        queryLoad = collection.find_one({"_id": object_id})
        print(queryLoad)

        if queryLoad:
            queryLoad.pop('_id', None)
            return jsonify(queryLoad)
        else:
            return jsonify({"Failed": True, "error": "No document found with the given _id"})
        
    except Exception as e:
        return jsonify({"Failed": True, "error": str(e)})