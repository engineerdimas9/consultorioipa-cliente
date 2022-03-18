$(document).ready(function(){
    // cargar data tipos pacientes
    dataTipos();
   
     // eliminar los tipos de paciente por id
    $("body #tipo-paciente").on('click', '.delete-tipo',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "DELETE",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/tipo/"+ id,    
            dataType: "json", 
            success: function (data){ 
                console.log(data);
                $("#tipo-paciente").empty(); 
                dataTipos();
            }, 
        });
    });

    // añadir tipo de pacientes
    $(".add-tipo").click(function(){
        var token = localStorage.getItem("token");
        var nombres =  $("#nombres-p").val();
        $.ajax({  
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/tipo/",
            data: {
                nombres: nombres
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);  
                $('#add-tipos').modal("close");                
            }, 
        });        
    });

    // abrir modal para actualizar tipo de pacientes
    $("body #tipo-paciente").on('click', '.update-tipo',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/tipo/"+id,
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $('#id-tipo-p').val(resp.id_tipo_p);
                $('#nombres-p').val(resp.nombres);
                $('#add-tipos').modal("open");                
            }, 
        });        
    });

    $(".up-tipo").click(function(){
        var token = localStorage.getItem("token");
        var id =  $("#id-tipo-p").val();
        var nombres =  $("#nombres-p").val();
        $.ajax({  
            type: "PUT",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/tipo/"+id,
            data: {
                nombres: nombres
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#tipo-paciente").empty(); 
                dataTipos();  
                $('#add-tipos').modal("close");                
            }, 
        });        
    });
    // buscar dentro de las tablas
    $("#search-paciente").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tipo-paciente tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
function dataTipos() {
 // cargar la tabla de tipos de pacientes
 var token = localStorage.getItem("token");
    $.ajax({  
        type: "GET",
        beforeSend: function(request) {
            request.setRequestHeader("x-access-token", token);
        }, 
        url: "https://consultorio-ipa.herokuapp.com/tipo/",    
        dataType: "json", 
        success: function (data){  
            $.each(data, function(i,item){
                var row = '<tr>'+
                    '<td data-title="ID">' + item.id_tipo_p + '</td>' + 
                    '<td data-title="Tipos">' + item.nombres + '</td>' +
                    '<td data-title="Acción">'+
                        '<a class="update-tipo btn-floating blue-medical btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_tipo_p + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">edit</i></a>'+
                        '<a class="delete-tipo btn-floating red accent-4 btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_tipo_p + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">delete</i></a>'+
                    '</td>' +
                '</tr>';						 
            $("#tipo-paciente").append(row);
        });
        }, 
    });
}