$(function () {
    loadAllBoxes();
});

function loadAllBoxes() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            var customersCount = http.getResponseHeader("C-Count");
            var itemsCount = http.getResponseHeader("I-Count");
            var ordersCount = http.getResponseHeader("O-Count");

            $("#customersCount").text(customersCount);
            $("#itemsCount").text(itemsCount);
            $("#ordersCount").text(ordersCount);
        }
    };

    http.open('GET', 'http://localhost:8080/pos/api/v1/custom', true);

    http.send();

}