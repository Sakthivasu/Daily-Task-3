
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__, static_folder='static')
CORS(app)

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="student_management"
)

cursor = db.cursor(dictionary=True)

@app.route('/')
def home():
    return app.send_static_file('index.html')

# GET ALL STUDENTS
@app.route('/api/students', methods=['GET'])
def get_students():

    cursor.execute("SELECT * FROM students")

    data = cursor.fetchall()

    return jsonify(students)

# ADD STUDENT
@app.route('/api/students', methods=['POST'])
def add_student():

    data = request.json

    sql = """
    INSERT INTO students
    (full_name,email,phone,course)
    VALUES(%s,%s,%s,%s)
    """

    values = (
        data['full_name'],
        data['email'],
        data['phone'],
        data['course']
    )

    cursor.execute(sql, values)

    db.commit()

    return jsonify({"message":"Student Added" })

@app.route('/api/students/<int:id>',
methods=['PUT'])

def delete_student(id):
    cursor.execute(
        "DELETE FROM student WHERE id=%s",
        (id,)
    )

    db.commit()

    return jsonify({"message":"Student Deleted"})

    
@app.route('/api/students/search')
def search_student():

    q = request.args.get('q')

    sql = """
    SELECT * FROM students
    WHERE full_name LIKE %s
    OR course LIKE %s
    """

    values = (
        '%' + q + '%',
        '%' + q + '%'
    )

    cursor.execute(sql, values)

    data = cursor.fetchall()

    return jsonify(data)

# Run Server
if __name__ == '__main__':
    app.run(debug=True)