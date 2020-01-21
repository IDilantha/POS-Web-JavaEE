$(function () {
    loadCustomers();
    deleteCustomer();
});

function loadCustomers() {
    $("#tbl-customers tbody tr").remove();
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var customers = JSON.parse(http.responseText);
            for (var i = 0; i < customers.length; i++) {
                var html = '<tr>' +
                    '<td>' + customers[i].id + '</td>' +
                    '<td>' + customers[i].name + '</td>' +
                    '<td>' + customers[i].address + '</td>' +
                    '<td><i class="fa fa-trash red"></i></td>' +
                    '</tr>';
                $("#tbl-customers tbody").append(html);
            }
        }
        showOrHideFooter();
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/customers', true);

    http.setRequestHeader("Content-Type", "application/json");

    http.send();
}

$("#btnSubmit").click(function () {
    var id = $("#txtId").val();
    var name = $("#txtName").val();
    var address = $("#txtCustomerAddress").val();

    if (id.match("^C[0-9]+$") && name.match("^[a-zA-Z]+$") && address.match("^[a-zA-Z]+$")) {

        var http = new XMLHttpRequest();

        var customer = {
            id: id,
            name: name,
            address: address
        };

        if ($("#btnSubmit").text() == "Save"){
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    var tableData = '<tr>' +
                        '<td>' + id + '</td>' +
                        '<td>' + name + '</td>' +
                        '<td>' + address + '</td>' +
                        '<td><i class="fa fa-trash red"></i></td>' +
                        '</tr>';
                    $("#tbl-customers tbody").append(tableData);
                    showOrHideFooter();
                    reset();
                    alert("Customer Saved Successfully !!");
                }
            };

            http.open('POST', 'http://localhost:8080/pos/api/v1/customers', true);

            http.send(JSON.stringify(customer));
        } else {
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    loadCustomers();
                    showOrHideFooter();
                    reset();
                    alert("Customer Updated Successfully !!");
                }
            };

            http.open('PUT', 'http://localhost:8080/pos/api/v1/customers', true);

            http.send(JSON.stringify(customer));
        }

    } else {
        if (!address.match("^[a-zA-Z]+$")) {
            $("#txtCustomerAddress").addClass("invalid").select();
        }
        if (!name.match("^[a-zA-Z]+$")) {
            $("#txtName").addClass("invalid").select();
        }
        if (!id.match("^C[0-9]+$")) {
            $("#txtId").addClass("invalid").select();
        }
    }
});

function reset() {
    $("#txtId").val("");
    $("#txtName").val("");
    $("#txtCustomerAddress").val("");
    $("#btnSubmit").text("Save");
    $("#txtId").focus();
}

$("#btnReset").click(function () {
    $("#btnSubmit").text("Save");
});

function deleteCustomer() {
    $("#tbl-customers").on('click', 'tbody tr td i', (function () {
        var customerId = $(this).parents('tr').children('td:first-child').text();

        if (confirm("Are you sure to delete this Customer?")) {
            var http = new XMLHttpRequest();

          //  var cusId = {id: id};

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200){
                    loadCustomers();
                    alert("Customer Deleted !!")
                    reset();
                }
            };

            http.open('DELETE', 'http://localhost:8080/pos/api/v1/customers' +'?customerId='+ customerId, true);

            http.send();
        }
    }));
}

$("#txtId").keyup(function () {
    $("#txtId").removeClass("invalid");
});

$("#txtName").keyup(function () {
    $("#txtName").removeClass("invalid");
});
$("#txtCustomerAddress").keyup(function () {
    $("#txtCustomerAddress").removeClass("invalid");
});


function showOrHideFooter() {
    if ($("#tbl-customers tbody tr").length > 0) {
        $("#tbl-customers tfoot").hide();
    } else {
        $("#tbl-customers tfoot").show();
    }
}


$("#tbl-customers").on('click','tbody tr',function () {
    var id = $(this).children('td:first-child').text();
    var name = $(this).children('td:nth-child(2)').text();
    var address = $(this).children('td:nth-child(3)').text();

    $("#txtId").val(id);
    $("#txtName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#btnSubmit").text("Update");
});
