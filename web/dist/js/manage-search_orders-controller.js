var query = "";

$(function () {
    loadOrders();
});

function loadOrders() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            $("#tbl-orders tbody tr").remove();
            var orders = JSON.parse(http.responseText);

            for (var i = 0; i < orders.length; i++) {
                var html = '<tr>' +
                    '<td>' + orders[i].oid + '</td>' +
                    '<td>' + orders[i].odate + '</td>' +
                    '<td>' + orders[i].cid + '</td>' +
                    '<td>' + orders[i].cname + '</td>' +
                    '<td>' + orders[i].total + '</td>' +
                    '</tr>';
                $("#tbl-orders tbody").append(html);
            }
        }
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/orders' + '?query=' + query, true);

    http.setRequestHeader("Content-Type", "application/json");

    http.send();
}

$("#txtSearch").keyup(function () {
    query = $("#txtSearch").val();
    loadOrders();
});