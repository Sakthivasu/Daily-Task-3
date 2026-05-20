const API ="http://localhost:5000/api/students";
const table = document.getElementById("table");
const total = document.getElementById("total");
const form = document.getElementById("form");
const search = document.getElementById("search");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const courseInput = document.getElementById("course");

function showStudents(students){
let editId = null;

#LoadStudents
async function loadStudents(url = API){

    const res = await fetch(url);

    const data = await res.json();
    tableBody.innerHTML = "";

    students.forEach(student => {

        tableBody.innerHTML += `
        <tr>

            <td>${student.full_name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>

                <button
                onclick="deleteStudent(${student.id})">
                Delete
                </button>

            </td>

        </tr>
        `;
    });
}
#UpdateStudent
form.addEventListener("submit", async function(e){

    e.preventDefault();

    const student = {

        full_name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        course: courseInput.value
    };

    if(editId){

        await fetch(API + "/" + editId, {

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)
        });

        editId = null;

    }else{

        await fetch(API, {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(student)
        });
    }

    form.reset();

    loadStudents();
});
#Edit
async function editStudent(id){

    const res = await fetch(API);

    const data = await res.json();

    const student = data.find(s => s.id == id);

    nameInput.value = student.full_name;
    emailInput.value = student.email;
    phoneInput.value = student.phone;
    courseInput.value = student.course;

    editId = id;
#Delete
async function deleteStudent(id){

    const confirmDelete =
    confirm("Delete Student?");

    if(confirmDelete){
         await fetch(API + "/" + id, {
            method:"DELETE"
        });

        loadStudents();
    }
}
#Search
search.addEventListener(
"keyup",
async function(){

    const q = search.value;
     if(q === ""){

        loadStudents();

    }else{

        loadStudents(API + "/search?q=" + q);
    }
});