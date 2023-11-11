// import {Customer} from "../model/Customer.js";
//
// export class CustomerController{
//     constructor() {
//         $('#Submit').click(this.handleSaveCustomer());
//         $('#Update').click(this.handleUpdateCustomer());
//     }
//
//     handleSaveCustomer(){
//         console.log('handle save customer');
//     }
//
//     handleUpdateCustomer(){
//         console.log('handle update customer');
//     }
//
//     // handleDeleteCustomer(){
//     //     console.log('handle delete customer');
//     // }
// }

// new CustomerController();


function validateForm() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var contact = document.getElementById("contact").value;

    if (id === ""){
        alert("Id is Required...");
        return false;
    }

    if (name === ""){
        alert("Name is Required...");
        return false;
    }

    if (address === ""){
        alert("Address is Required...");
        return false;
    }

    if (contact === ""){
        alert("Contact is Required...");
        return false;
    }

    return true;
}

//function to show data from local storage
function showData() {
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var html = "";

    peopleList.forEach(function (element , index){
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.contact + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="UpdateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//loads all data when document or page loaded
document.onload = showData();

//function to add data to local storage
function AddData() {
    //if form is validate
    if (validateForm() === true){
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var contact = document.getElementById("contact").value;

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList = [];
        }else{
            peopleList = JSON.parse(localStorage.getItem("peopleList"))
        }

        peopleList.push({
            id : id,
            name : name,
            address : address,
            contact : contact,
        });

        localStorage.setItem("peopleList",JSON.stringify(peopleList));
        showData();
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("contact").value = "";
    }
}

//function to delete data from local storage
function deleteData(index) {
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    peopleList.splice(index,1);
    localStorage.setItem("peopleList" , JSON.stringify(peopleList));
    showData();
}

//function to updata data from local storage
function UpdateData(index){
    // submit button will hide and Update button will show for updating of Data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("id").value = peopleList[index].id;
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("contact").value = peopleList[index].contact;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() === true){
            peopleList[index].id = document.getElementById("id").value;
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].contact = document.getElementById("contact").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("address").value = "";
            document.getElementById("contact").value = "";

            //update button will hide and submit button will show
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}
