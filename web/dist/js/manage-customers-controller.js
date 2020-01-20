$(function () {
    loadCustomers();
    deleteCustomer();
});

function loadCustomers() {
    $("#tbl-customers tbody tr").remove();
    for (var i=0; i<customers.length; i++){
        var html = '<tr>' +
            '<td>'+ customers[i].id+'</td>' +
            '<td>'+ customers[i].name+'</td>' +
            '<td>'+ customers[i].address+'</td>' +
            '<td><i class="fa fa-trash red"></i></td>' +
            '</tr>';
        $("#tbl-customers tbody").append(html);
    }
    showOrHideFooter();
}

$("#btnSubmit").click(function () {
    var id = $("#txtId").val();
    var name = $("#txtName").val();
    var address = $("#txtCustomerAddress").val();

    var  tableData = '<tr>' +
    '<td>'+ id+'</td>' +
    '<td>'+ name+'</td>' +
    '<td>'+ address+'</td>' +
    '<td><i class="fa fa-trash red"></i></td>' +
    '</tr>';

    if (id.match("^C[0-9]+$") && name.match("^[a-zA-Z]+$") && address.match("^[a-zA-Z]+$")){
        $("#tbl-customers tbody").append(tableData);
        showOrHideFooter();
        reset();
    }else {
        if (!address.match("^[a-zA-Z]+$")){
            $("#txtCustomerAddress").addClass("invalid").select();
        }
        if (!name.match("^[a-zA-Z]+$")){
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
    $("#txtId").focus();
}

function deleteCustomer() {
    $("#tbl-customers").on('click','tbody tr td i',(function(){
        if(confirm("Are you sure to delete this Customer?")){
            $(this).parents("tr").fadeOut(1000, function(){
                $(this).remove();
                showOrHideFooter();
            });
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


function showOrHideFooter(){
    if ($("#tbl-customers tbody tr").length > 0){
        $("#tbl-customers tfoot").hide();
    }else{
        $("#tbl-customers tfoot").show();
    }
};