$(function () {
   loadCustomerIDs();
   loadItemIDs();
   deleteOrderItem();
});

var Total = 0;

function loadCustomerIDs() {
    for (var i=0; i<customers.length;i++){
       var customerList = '<option>'+ customers[i].id +'</option>';
       $("#txtId").append(customerList);
    }
    showOrHideFooter();
}

function loadItemIDs() {
    for (var i=0; i<items.length;i++){
        var itemList = '<option>'+ items[i].code +'</option>';
        $("#txtCode").append(itemList);
    }
}

function customerLoad() {
    var customerID = document.getElementById("txtId").options[document.getElementById("txtId").selectedIndex].text;
    for (var i=0;i<customers.length; i++){
        if (customerID == customers[i].id){
            document.getElementById("txtName").value = customers[i].name;
        }
    }
}

function itemLoad() {
    var itemCode = document.getElementById("txtCode").options[document.getElementById("txtCode").selectedIndex].text;
    for (var i=0;i<items.length; i++){
        if (itemCode == items[i].code){
            document.getElementById("txtDescription").value = items[i].description;
            document.getElementById("txtQtyOnHand").value = items[i].qty;
            document.getElementById("txtUnitPrice").value = items[i].unitPrice;
        }
    }
}

function addItemsToTable() {
    $("#divFooter").children().remove();
    var tot = $("#txtUnitPrice").val()*$("#txtQty").val();
    var  orderData = '<tr>' +
        '<td>'+ $("#txtCode").val() +'</td>' +
        '<td>'+ $("#txtDescription").val() +'</td>' +
        '<td>'+ $("#txtQty").val()+'</td>' +
        '<td>'+ $("#txtUnitPrice").val() +'</td>' +
        '<td>'+ tot +'</td>' +
        '<td><i class="fa fa-trash red"></i></td>' +
        '</tr>';
    $("#tbl-placeorder").append(orderData);
    Total += tot;
    var total = '<h3 align="left">'+ "Total : "+Total +'</h3>';
    $("#divFooter").append(total);
    resetAll();
    showOrHideFooter();
}

function resetAll() {
    $("#txtCode").val("");
    $("#txtId").val("");
    $("#txtDescription").val("");
    $("#txtQty").val("");
    $("#txtQtyOnHand").val("");
    $("#txtName").val("");
    $("#txtUnitPrice").val("");
}

function showOrHideFooter(){
    if ($("#tbl-placeorder tbody tr").length > 0){
        $("#tbl-placeorder tfoot").hide();
    }else{
        $("#divFooter").children().remove();
        $("#tbl-placeorder tfoot").show();
    }
}

function deleteOrderItem() {
    $("#tbl-placeorder").on('click','tbody tr td i',(function(){
        var tot = $("#tbl-placeorder tbody tr td:nth-child(5)").text();
        if(confirm("Are you sure to delete this Item From Order?")){
            console.log(tot);
            $(this).parents("tr").fadeOut(1000, function(){
                $("#divFooter").children().remove();
                $(this).remove();
                Total -= tot;
                var total = '<h3 align="left">'+ "Total : "+Total +'</h3>';
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
