$(function () {
   loadAllBoxes();
});

function loadAllBoxes() {
    $("#customersCount").text(customers.length);
    $("#itemsCount").text(items.length);
    $("#ordersCount").text(orders.length);
}