function generateOrderID() {
    try {
        var cartList;
        if(localStorage.getItem("cartList") == null){
            cartList = [];
        }else{
            cartList = JSON.parse(localStorage.getItem("cartList"))
        }

        let lastOId =cartList[cartList.length - 1].cartOID;
        console.log(lastOId);
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#idText").val("D00" + newOId);
        } else if (newOId < 100) {
            $("#idText").val("D0" + newOId);
        } else {
            $("#idText").val("D" + newOId);
        }
    } catch (e) {
        $("#idText").val("D001");
    }

}

document.onload =generateOrderID();

// -----------------------CUSTOMERRR---------------------------

function loadCustIDs(){
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var ids=document.getElementById("cmbCustIDs");

    for (let i = 0; i < peopleList.length; i++) {
        var option = document.createElement("option");
        var txt = document.createTextNode(peopleList[i].id);
        option.appendChild(txt);
        option.setAttribute("value",peopleList[i].id);
        ids.insertBefore(option,ids.lastChild);
    }
}

document.onload =loadCustIDs();

$("#cmbCustIDs").click(function () {
    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    for (let i = 0; i < peopleList.length; i++) {
        if ($('#cmbCustIDs').val() === peopleList[i].id) {
            $('#customer').val(peopleList[i].id);
            $('#name').val(peopleList[i].name);
            $('#address').val(peopleList[i].address);
            $('#number').val(peopleList[i].contact);
        }
    }
});

// -----------------------ITEMMMM---------------------------

function loadItemIDs(){
    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"))
    }

    var codes=document.getElementById("cmbItemIDs");

    for (let i = 0; i < itemList.length; i++) {
        var option = document.createElement("option");
        var txt = document.createTextNode(itemList[i].code);
        option.appendChild(txt);
        option.setAttribute("value",itemList[i].code);
        codes.insertBefore(option,codes.lastChild);
    }
}

document.onload =loadItemIDs();

$("#cmbItemIDs").click(function () {
    var itemList;
    if (localStorage.getItem("itemList") == null) {
        itemList = [];
    } else {
        itemList = JSON.parse(localStorage.getItem("itemList"))

        for (let i = 0; i < itemList.length; i++) {
            if ($('#cmbItemIDs').val() === itemList[i].code) {
                $('#itemName').val(itemList[i].name);
                $('#qtyOnHand').val(itemList[i].quantity);
                $('#price').val(itemList[i].price);
            }
        }
    }
});

function qtyUpdate() {
    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"))
    }

    var itemQty=$('#qtyOnHand').val();
    var orderQty=$('#qtyYouWant').val();

    var updateQty=itemQty-orderQty;

    for (let i = 0; i < itemList.length ; i++) {
        if($('#cmbItemIDs').val() === itemList[i].code){
            itemList[i].code = itemList[i].code;
            itemList[i].name = itemList[i].name;
            itemList[i].quantity = updateQty;
            itemList[i].price = itemList[i].price;

            localStorage.setItem("itemList", JSON.stringify(itemList));

            // item=itemList[i];
            // item.setItemQTY(updateQty);
            // $('#qtyOnHand').val(item.getItemQTY());
        }
    }
}

$("#btn-addToCart").click(function () {

    let qty=parseInt($('#qtyOnHand').val());
    let Oqty=parseInt($('#qtyYouWant').val());
    console.log(qty,Oqty);
    if($('#qtyYouWant').val() !== ""){
        if(qty<Oqty){
            alert("Not Available This Quantity");
        }else{
            qtyUpdate();
            addToCart();
            generateOrderID();
            loadCart();
            getTotal();
            $("#itemName,#price,#qtyOnHand,#qtyYouWant,#date,#cmbCustIDs,#cmbItemIDs,#customer,#name,#address,#number").val("")
        }
    }else{
        alert("Please Enter Order Qty");
    }
});

// ------------------------------------------------------------
let fullTotal = 0 ;

function addToCart(){
    // let oId=$("#idText").val();
    let oId=document.getElementById("idText").value;
    // let cName=$("#name").val();
    let cName=document.getElementById("name").value;
    // let iID=$("#cmbItemIDs").val();
    let iID=document.getElementById("cmbItemIDs").value;
    // let iName=$("#itemName").val();
    let iName=document.getElementById("itemName").value;
    // let iPrice=$("#price").val();
    let iPrice=document.getElementById("price").value;
    // let orderQty=$("#qtyYouWant").val();
    let orderQty=document.getElementById("qtyYouWant").value;
    let total=iPrice*orderQty;
    fullTotal=total+fullTotal;

    var cartList;
    if(localStorage.getItem("cartList") == null){
        cartList = [];
    }else{
        cartList = JSON.parse(localStorage.getItem("cartList"))
    }

    // for (let i=0;i<cartList.length;i++){
    //
    //     if(cartList[i].getcartICode() === iID){
    //         var newQty=+cartList[i].getcartOQty() + +orderQty;
    //         let newTotal=iPrice*newQty;
    //         cartList[i].setcartOQty(newQty);
    //         cartList[i].setTotal(newTotal);
    //         return;
    //     }
    //
    // }

    cartList.push({
        cartOID : oId,
        cartCName : cName,
        cartICode : iID,
        cartIName : iName,
        cartIPrice : iPrice,
        orderQty : orderQty,
        total : total,
    });

    localStorage.setItem("cartList",JSON.stringify(cartList));
}

function loadCart() {
    var cartList;
    if(localStorage.getItem("cartList") == null){
        cartList = [];
    }else{
        cartList = JSON.parse(localStorage.getItem("cartList"))
    }

    var html = "";

    cartList.forEach(function (element , index){
        html += "<tr>";
        html += "<td>" + element.cartOID + "</td>";
        html += "<td>" + element.cartCName + "</td>";
        html += "<td>" + element.cartICode + "</td>";
        html += "<td>" + element.cartIName + "</td>";
        html += "<td>" + element.cartIPrice + "</td>";
        html += "<td>" + element.orderQty + "</td>";
        html += "<td>" + element.total + "</td>";
        html += '<td><button type="button" onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button type="button" onclick="UpdateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';

        html += "</tr>";
    });

    document.querySelector("#addToCartTable tbody").innerHTML = html;
}

function deleteData(index) {
    var cartList;
    if(localStorage.getItem("cartList") == null){
        cartList = [];
    }else{
        cartList = JSON.parse(localStorage.getItem("cartList"))
    }

    cartList.splice(index,1);
    localStorage.setItem("cartList" , JSON.stringify(cartList));

    loadCart();
    generateOrderID();
}

function UpdateData(index){
    // submit button will hide and Update button will show for updating of Data in local storage
    document.getElementById("btn-addToCart").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var cartList;
    if(localStorage.getItem("cartList") == null){
        cartList = [];
    }else{
        cartList = JSON.parse(localStorage.getItem("cartList"));
    }

    var peopleList;
    if(localStorage.getItem("peopleList") == null){
        peopleList = [];
    }else{
        peopleList = JSON.parse(localStorage.getItem("peopleList"))
    }

    var itemList;
    if(localStorage.getItem("itemList") == null){
        itemList = [];
    }else{
        itemList = JSON.parse(localStorage.getItem("itemList"));
    }

    document.getElementById("idText").value = cartList[index].cartOID;
    // document.getElementById("id").value = peopleList[index].id;
    // document.getElementById("cmbItemIDs").value = peopleList[index].id;
    document.getElementById("name").value = cartList[index].cartCName;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("number").value = peopleList[index].contact;
    document.getElementById("cmbItemIDs").value = cartList[index].cartICode;
    document.getElementById("itemName").value = cartList[index].cartIName;
    document.getElementById("price").value = cartList[index].cartIPrice;
    document.getElementById("qtyYouWant").value = cartList[index].orderQty;
    document.getElementById("total").value = cartList[index].total;

    document.querySelector("#Update").onclick = function () {
        //if (validateForm() === true){
            cartList[index].cartOID = document.getElementById("idText").value;
            cartList[index].cartCName = document.getElementById("name").value;
            // peopleList[index].id = document.getElementById("id").value;
            // peopleList[index].id = document.getElementById("cmbItemIDs").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].contact = document.getElementById("number").value;
            cartList[index].cartICode = document.getElementById("cmbItemIDs").value;
            cartList[index].cartIName = document.getElementById("itemName").value;
            cartList[index].cartIPrice = document.getElementById("price").value;
            cartList[index].orderQty = document.getElementById("qtyYouWant").value;
            cartList[index].total = document.getElementById("total").value;

            localStorage.setItem("cartList", JSON.stringify(cartList));

            document.getElementById("idText").value = " ";
            document.getElementById("name").value = " ";
            // document.getElementById("cmbItemIDs").value = " ";
            document.getElementById("address").value = " ";
            document.getElementById("number").value = " ";
            document.getElementById("cmbItemIDs").value = " ";
            document.getElementById("itemName").value = " ";
            document.getElementById("price").value = " ";
            document.getElementById("qtyYouWant").value = " ";
            document.getElementById("total").value = " ";

            //update button will hide and submit button will show
            document.getElementById("btn-addToCart").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }

    loadCart();
    //}
}

document.onload =loadCart();

function getTotal() {
    let tot = 0;
    $('#addToCartTable>tr').each(function () {
        tot = tot + parseFloat($($(this).children().get(6)).text());
        $('#total>span').text(tot).append('.00');

        if($('#discount').val() === ""){
            $('#subtotal>span').text(tot).append('.00');
        }
    });
    t = tot;
}

$('#discount').on('keyup', function () {
    if ($('#discount').val() === '') {
        $('#subtotal>span').text('0.00');
    } else {
        let tot = parseFloat(t);
        let dis = tot/100 * parseFloat($('#discount').val());

        $('#subtotal>span').text(tot - dis).append('.00');
    }
});

//
// function placeOrder() {
//
//     if(saveOrder()){
//         for (var i of cartDb){
//             orderDetailsDb.push(new OrderDetailsDTO(i.getCartOID(),i.getcartICode(),i.getcartIPrice(),i.getcartOQty(),i.getTotal()));
//
//         }
//         alert("Successfull")
//     }
//
// }

// function saveOrder() {
//     let oId=$("#txtOrderID").val();
//     let cName=$("#txtPCustName").val();
//     let iPrice=$("#txtPPrice").val();
//     let orderQty=$("#txtOrderQty").val();
//     let fullTotal=$("#total").text();
//     let  date=$("#date").val();
//     console.log(oId,cName,fullTotal,date);
//
//     return orderDb.push(new OrderDTO(oId,cName,fullTotal,date));
// }

// $("#btn-purchase-order").click(function () {
//     placeOrder();
//     generateOrderID();
//     cartDb.splice(0,cartDb.length);
//     $('#addToCartTable').empty();
//     $("#txtPItemName,#txtPPrice,#txtPItemQty,#txtOrderQty,#txtPCustSalary,#txtPCustName,#txtPCustAddress").val("")
// });

// $("#txtCash").on('keyup', function (eventOb) {
//     if (eventOb.key == "Enter") {
//         let cash=parseFloat($('#txtCash').val());
//         let total=$('#subtotal>span').text();
//         console.log(cash,total)
//         let balance=cash - total;
//
//         $('#txtBalance').val(balance);
//     }
// });