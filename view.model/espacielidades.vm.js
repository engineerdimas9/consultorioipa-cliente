$(document).ready(function(){
    dataEspecilidades();

    // eliminar especialidades por id
    $("body #esp").on('click', '.delete-esp',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "DELETE",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/especialidad/"+ id,    
            dataType: "json", 
            success: function (data){ 
                console.log(data);
                $("#esp").empty(); 
                dataEspecilidades();
            }, 
        });
    });

    // añadir tipo de pacientes
    $(".add-esp").click(function(){
        var token = localStorage.getItem("token");
        var nombres =  $("#nombres-esp").val();
        $.ajax({  
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/especialidad/",
            data: {
                nombres: nombres
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#esp").empty();
                dataEspecilidades();
                $('#add-esp').modal("close");                
            }, 
        });        
    });

    // abrir modal para actualizar tipo de pacientes
    $("body #esp").on('click', '.update-esp',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/especialidad/"+id,
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $('#id-esp').val(resp.id_esp);
                $('#nombres-esp').val(resp.nombres);
                $('#add-esp').modal("open");                
            }, 
        });        
    });

    $(".up-esp").click(function(){
        var token = localStorage.getItem("token");
        var id =  $("#id-esp").val();
        var nombres =  $("#nombres-esp").val();
        $.ajax({  
            type: "PUT",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/especialidad/"+id,
            data: {
                nombres: nombres
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#esp").empty(); 
                dataEspecilidades();  
                $('#add-esp').modal("close");                
            }, 
        });        
    });
    // buscar dentro de las tablas
    $("#search-esp").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#esp tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function dataEspecilidades() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/especialidad/",    
           dataType: "json", 
           success: function (data){  
               $.each(data, function(i,item){
                   var row = '<tr>'+
                       '<td data-title="ID">' + item.id_esp + '</td>' + 
                       '<td data-title="Tipos">' + item.nombres + '</td>' +
                       '<td data-title="Acción">'+
                           '<a class="update-esp btn-floating blue-medical btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_esp + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">edit</i></a>'+
                           '<a class="delete-esp btn-floating red accent-4 btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_esp + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">delete</i></a>'+
                       '</td>' +
                   '</tr>';						 
               $("#esp").append(row);
           });
           }, 
       });
   }