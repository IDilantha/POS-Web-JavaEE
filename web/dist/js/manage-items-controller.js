$(function () {
    loadItems();
    deleteItem();
});

function loadItems() {
    $("#tbl-items tbody tr").remove();

    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var items = JSON.parse(http.responseText);
            for (var i = 0; i < items.length; i++) {
                var html = '<tr>' +
                    '<td>' + items[i].code + '</td>' +
                    '<td>' + items[i].description + '</td>' +
                    '<td>' + items[i].qtyOnHand + '</td>' +
                    '<td>' + items[i].unitPrice + '</td>' +
                    '<td><i class="fa fa-trash red"></i></td>' +
                    '</tr>';
                $("#tbl-items tbody").append(html);
            }
        }
        showOrHideFooter();
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/items', true);

    http.setRequestHeader("Content-Type", "application/json");

    http.send();

}

$("#btn-ItemAdd").click(function () {
    var code = $("#txtItemId").val();
    var description = $("#txtItemDesc").val();
    var qtyOnHand = $("#txtQtyOnHand").val();
    var unitPrice = $("#txtUnitPrice").val();

    if (code.match("^I[0-9]+$") && description.match("^[a-zA-Z]+$") && qtyOnHand.match("^[]?\\d+$") && unitPrice.match("^\\d+(,\\d{3})*(\\.\\d{1,2})?$")) {

        var http = new XMLHttpRequest();

        var item = {
            code: code,
            description: description,
            qtyOnHand: qtyOnHand,
            unitPrice: unitPrice
        };

        if ($("#btn-ItemAdd").text() == "Save") {
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    var tableData = '<tr>' +
                        '<td>' + code + '</td>' +
                        '<td>' + description + '</td>' +
                        '<td>' + qtyOnHand + '</td>' +
                        '<td>' + unitPrice + '</td>' +
                        '<td><i class="fa fa-trash red"></i></td>' +
                        '</tr>';
                    $("#tbl-items tbody").append(tableData);
                    showOrHideFooter();
                    reset();
                    alert("Item Saved Successfully !!");
                }
            };

            http.open('POST', 'http://localhost:8080/pos/api/v1/items', true);

            http.send(JSON.stringify(item));
        } else {
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    loadItems();
                    showOrHideFooter();
                    reset();
                    alert("Item Updated Successfully !!");
                }
            };

            http.open('PUT', 'http://localhost:8080/pos/api/v1/items', true);

            http.send(JSON.stringify(item));
        }
    } else {
        if (!unitPrice.match("^\\d+(,\\d{3})*(\\.\\d{1,2})?$")) {
            $("#txtUnitPrice").addClass("invalid").select();
        }
        if (!qtyOnHand.match("^[]?\\d+$")) {
            $("#txtQtyOnHand").addClass("invalid").select();
        }
        if (!description.match("^[a-zA-Z]+$")) {
            $("#txtItemDesc").addClass("invalid").select();
        }
        if (!code.match("^I[0-9]+$")) {
            $("#txtItemId").addClass("invalid").select();
        }
    }
});

function reset() {
    $("#txtItemId").val("");
    $("#txtItemDesc").val("");
    $("#txtUnitPrice").val("");
    $("#txtQtyOnHand").val("");
    $("#btn-ItemAdd").text("Save");
    $("#txtCode").focus();
}

$("#btnReset").click(function () {
    $("#btn-ItemAdd").text("Save");
});

function deleteItem() {
    $("#tbl-items").on('click', 'tbody tr td i', (function () {
        var code = $(this).parents('tr').children('td:first-child').text();

        if (confirm("Are you sure to delete this Item?")) {
            var http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    loadItems();
                    reset();
                    alert("Item Deleted !!")
                }
            };

            http.open('DELETE', 'http://localhost:8080/pos/api/v1/items'+'?code=' + code, true);

            http.send();
        }
    }));
}

$("#txtItemId").keyup(function () {
    $("#txtItemId").removeClass("invalid");
});

$("#txtItemDesc").keyup(function () {
    $("#txtItemDesc").removeClass("invalid");
});

$("#txtUnitPrice").keyup(function () {
    $("#txtUnitPrice").removeClass("invalid");
});

$("#txtQtyOnHand").keyup(function () {
    $("#txtQtyOnHand").removeClass("invalid");
});

function showOrHideFooter() {
    if ($("#tbl-items tbody tr").length > 0) {
        $("#tbl-items tfoot").hide();
    } else {
        $("#tbl-items tfoot").show();
    }
}

$("#tbl-items").on('click', 'tbody tr', function () {
    var code = $(this).children('td:first-child').text();
    var description = $(this).children('td:nth-child(2)').text();
    var qtyOnHand = $(this).children('td:nth-child(3)').text();
    var unitPrice = $(this).children('td:nth-child(4)').text();

    $("#txtItemId").val(code);
    $("#txtItemDesc").val(description);
    $("#txtQtyOnHand").val(qtyOnHand);
    $("#txtUnitPrice").val(unitPrice);
    $("#btn-ItemAdd").text("Update");
});
