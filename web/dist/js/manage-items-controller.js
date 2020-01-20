$(function () {
    loadItems();
    deleteItem();
});

function loadItems() {
    $("#tbl-items tbody tr").remove();
    for (var i=0; i<items.length;i++){
        var html = '<tr>' +
            '<td>'+ items[i].code+'</td>' +
            '<td>'+ items[i].description+'</td>' +
            '<td>'+ items[i].qty+'</td>' +
            '<td>'+ items[i].unitPrice+'</td>' +
            '<td><i class="fa fa-trash red"></i></td>' +
            '</tr>';
        $("#tbl-items tbody").append(html);
    }
    showOrHideFooter();
}

$("#btn-ItemAdd").click(function () {
    var code = $("#txtItemId").val();
    var description = $("#txtItemDesc").val();
    var qty = $("#txtQtyOnHand").val();
    var unitPrice = $("#txtUnitPrice").val();

    var  tableData = '<tr>' +
        '<td>'+ code +'</td>' +
        '<td>'+ description +'</td>' +
        '<td>'+ qty +'</td>' +
        '<td>'+ unitPrice +'</td>' +
        '<td><i class="fa fa-trash red"></i></td>' +
        '</tr>';

    if (code.match("^I[0-9]+$") && description.match("^[a-zA-Z]+$") && qty.match("^[]?\\d+$") && unitPrice.match("^\\d+(,\\d{3})*(\\.\\d{1,2})?$")){
        $("#tbl-items tbody").append(tableData);
        reset();
    }else {
        if (!unitPrice.match("^\\d+(,\\d{3})*(\\.\\d{1,2})?$")){
            $("#txtUnitPrice").addClass("invalid").select();
        }
        if (!qty.match("^[]?\\d+$")){
            $("#txtQtyOnHand").addClass("invalid").select();
        }
        if (!description.match("^[a-zA-Z]+$")){
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
    $("#txtCode").focus();
}

function deleteItem() {
    $("#tbl-items").on('click','tbody tr td i',(function(){
        if(confirm("Are you sure to delete this Item?")){
            $(this).parents("tr").fadeOut(1000, function(){
                $(this).remove();
                showOrHideFooter();
            });
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


function showOrHideFooter(){
    if ($("#tbl-items tbody tr").length > 0){
        $("#tbl-items tfoot").hide();
    }else{
        $("#tbl-items tfoot").show();
    }
}