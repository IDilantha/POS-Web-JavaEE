$(function () {
   loadOrders();
});

function loadOrders() {
    $("#tbl-orders tbody tr").remove();
    for (var i=0; i<orders.length;i++){
        var html = '<tr>' +
            '<td>'+ orders[i].orderId+'</td>' +
            '<td>'+ orders[i].orderDate+'</td>' +
            '<td>'+ orders[i].customerId+'</td>' +
            '<td>'+ orders[i].customerName+'</td>' +
            '<td>'+ orders[i].total+'</td>' +
            '</tr>';
        $("#tbl-orders tbody").append(html);
    }
}

$("#txtSearch").keyup(function () {
    var txt = $("#txtSearch").val();
    $("#tbl-orders tbody tr").remove();
    search(txt);
});

function search() {
    for(var i=0; i < orders.length; i++){
        if (arguments[0]== orders[i].orderId || arguments[0]==orders[i].orderDate || arguments[0]==orders[i].customerId || arguments[0]==orders[i].customerName || arguments[0]==orders[i].total ){
             var search = '<tr>' +
                 '<td>'+ orders[i].orderId+'</td>' +
                 '<td>'+ orders[i].orderDate+'</td>' +
                 '<td>'+ orders[i].customerId+'</td>' +
                 '<td>'+ orders[i].customerName+'</td>' +
                 '<td>'+ orders[i].total+'</td>' +
                 '</tr>';
             $("#tbl-orders tbody").append(search);
        }
    }
}