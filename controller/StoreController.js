function validateForm() {
    var code = document.getElementById("code").value;
    var name = document.getElementById("name").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;

    if (code === ""){
        alert("Code is Required...");
        return false;
    }

    if (name === ""){
        alert("Name is Required...");
        return false;
    }

    if (quantity === ""){
        alert("Quantity is Required...");
        return false;
    }

    if (price === ""){
        alert("Price is Required...");
        return false;
    }

    return true;
}

//function to show data from local storage
function showData() {
    var itemList;
    if(localStorage.getItem("itemList") === null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"))
    }

    var html = "";

    itemList.forEach(function (element , index){
        html += "<tr>";
        html += "<td>" + element.code + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.quantity + "</td>";
        html += "<td>" + element.price + "</td>";
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
        var code = document.getElementById("code").value;
        var name = document.getElementById("name").value;
        var quantity = document.getElementById("quantity").value;
        var price = document.getElementById("price").value;

        var itemList;
        if(localStorage.getItem("itemList") == null){
            itemList = [];
        }else{
            itemList = JSON.parse(localStorage.getItem("itemList"))
        }

        itemList.push({
            code : code,
            name : name,
            quantity : quantity,
            price : price,
        });

        localStorage.setItem("itemList",JSON.stringify(itemList));

        showData();

        document.getElementById("code").value = "";
        document.getElementById("name").value = "";
        document.getElementById("quantity").value = "";
        document.getElementById("price").value = "";
    }
}

//function to delete data from local storage
function deleteData(index) {
    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"))
    }

    itemList.splice(index,1);
    localStorage.setItem("itemList" , JSON.stringify(itemList));
    showData();
}

//function to updata data from local storage
function UpdateData(index) {
    // submit button will hide and Update button will show for updating of Data in local storage
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }

    document.getElementById("code").value = itemList[index].code;
    document.getElementById("name").value = itemList[index].name;
    document.getElementById("quantity").value = itemList[index].quantity;
    document.getElementById("price").value = itemList[index].price;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() === true){
            itemList[index].code = document.getElementById("code").value;
            itemList[index].name = document.getElementById("name").value;
            itemList[index].quantity = document.getElementById("quantity").value;
            itemList[index].price = document.getElementById("price").value;

            localStorage.setItem("itemList", JSON.stringify(itemList));

            showData();

            document.getElementById("code").value = "";
            document.getElementById("name").value = "";
            document.getElementById("quantity").value = "";
            document.getElementById("price").value = "";

            //update button will hide and submit button will show
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}