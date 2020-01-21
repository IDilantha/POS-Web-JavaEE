$(function () {
    loadCustomerIDs();
    loadItemIDs();
    deleteOrderItem();
});

var customersList = [];
var itemsList = [];
var orderDetailsList = [];

var Total = 0;

function loadCustomerIDs() {

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var customers = JSON.parse(http.responseText);
            for (var i = 0; i < customers.length; i++) {
                var cusIDs = '<option>' + customers[i].id + '</option>';
                $("#txtId").append(cusIDs);
                customersList.push({id: customers[i].id, name: customers[i].name, address: customers[i].address});
            }
            showOrHideFooter();
        }
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/customers', true);

    http.send();
}

function loadItemIDs() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var items = JSON.parse(http.responseText);
            for (var i = 0; i < items.length; i++) {
                var itemIDs = '<option>' + items[i].code + '</option>';
                $("#txtCode").append(itemIDs);
                itemsList.push({
                    code: items[i].code,
                    description: items[i].description,
                    qtyOnHand: items[i].qtyOnHand,
                    unitPrice: items[i].unitPrice
                });
            }
            showOrHideFooter();
        }
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/items', true);

    http.send();
}

function customerLoad() {
    console.log(customersList.toString());
    var customerID = document.getElementById("txtId").options[document.getElementById("txtId").selectedIndex].text;
    for (var i = 0; i < customersList.length; i++) {
        if (customerID == customersList[i].id) {
            document.getElementById("txtName").value = customersList[i].name;
        }
    }
}

function itemLoad() {
    var itemCode = document.getElementById("txtCode").options[document.getElementById("txtCode").selectedIndex].text;
    for (var i = 0; i < itemsList.length; i++) {
        if (itemCode == itemsList[i].code) {
            document.getElementById("txtDescription").value = itemsList[i].description;
            document.getElementById("txtQtyOnHand").value = itemsList[i].qtyOnHand;
            document.getElementById("txtUnitPrice").value = itemsList[i].unitPrice;
        }
    }
}

function addItemsToTable() {
    $("#divFooter").children().remove();
    var tot = $("#txtUnitPrice").val() * $("#txtQty").val();
    var orderData = '<tr>' +
        '<td>' + $("#txtCode").val() + '</td>' +
        '<td>' + $("#txtDescription").val() + '</td>' +
        '<td>' + $("#txtQty").val() + '</td>' +
        '<td>' + $("#txtUnitPrice").val() + '</td>' +
        '<td>' + tot + '</td>' +
        '<td><i class="fa fa-trash red"></i></td>' +
        '</tr>';
    $("#tbl-placeorder").append(orderData);

    orderDetailsList.push({
        code: $("#txtCode").val(),
        description: $("#txtId").val(),
        qtyOnHand: $("#txtQty").val(),
        unitPrice: $("#txtUnitPrice").val()
    });

    Total += tot;
    var total = '<h3 align="left">' + "Total : " + Total + '</h3>';
    $("#divFooter").append(total);
    resetAll();
    showOrHideFooter();
}

function resetAll() {
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtQty").val("");
    $("#txtQtyOnHand").val("");
    $("#txtUnitPrice").val("");
}

function showOrHideFooter() {
    if ($("#tbl-placeorder tbody tr").length > 0) {
        $("#tbl-placeorder tfoot").hide();
    } else {
        $("#divFooter").children().remove();
        $("#tbl-placeorder tfoot").show();
    }
}

function deleteOrderItem() {
    $("#tbl-placeorder").on('click', 'tbody tr td i', (function () {
        var tot = $("#tbl-placeorder tbody tr td:nth-child(5)").text();
        if (confirm("Are you sure to delete this Item From Order?")) {
            console.log(tot);
            $(this).parents("tr").fadeOut(1000, function () {
                $("#divFooter").children().remove();
                $(this).remove();
                Total -= tot;
                var total = '<h3 align="left">' + "Total : " + Total + '</h3>';
                $("#divFooter").append(total);
                showOrHideFooter();
            });
        }
    }));
}

function resetTable() {
    $("#tbl-placeorder tbody tr").remove();
    showOrHideFooter();
}


$("#btnPlaceOrder").on('click', function () {

    var cusId = $("#txtId").val();

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            alert("Order Placed Successfully !")
        }
        showOrHideFooter();
    };

    http.open('POST', 'http://localhost:8080/pos/api/v1/orders'+'?&cusId='+cusId, true);

    http.setRequestHeader("Content-Type", "application/json");

    http.send(JSON.stringify(orderDetailsList));
});