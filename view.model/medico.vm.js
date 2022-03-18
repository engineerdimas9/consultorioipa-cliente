$(document).ready(function(){
    dataMedico();
    dataEsp();
    // eliminar medico por id
    $("body #med").on('click', '.delete-med',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "DELETE",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/medico/"+ id,    
            dataType: "json", 
            success: function (data){ 
                console.log(data);
                $("#doctor").empty(); 
                dataMedico();
            }, 
        });
    });
     // añadir medico
     $(".add-med").click(function(){
        var token = localStorage.getItem("token");
        var cedula =  $("#cedula-med").val();
        var nombres =  $("#nombres-med").val();
        var especialidad =  $("#select-esp").val();
        var phone =  $("#phone-med").val();
        var email =  $("#email-med").val();
        $.ajax({  
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/medico/",
            data: {
                cedula: cedula,
                nombres: nombres,
                especialidades: especialidad,
                telefono: phone,
                email: email
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#doctor").empty();
                dataMedico();
                $('#add-med').modal("close");                
            }, 
        });        
    });

    // abrir modal para actualizar medicos
    $("body #med").on('click', '.update-med',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/medico/"+id,
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#id-med").val(resp.id_med);
                $("#cedula-med").val(resp.cedula);
                $("#nombres-med").val(resp.nombres);
                $("#select-esp option[value="+ resp.especialidades +"]").attr("selected",true).val();
                $('select').formSelect();
                $("#phone-med").val(resp.telefono);
                $("#email-med").val(resp.email);
                $('#add-med').modal("open");                
            }, 
        });
    });
    //actualizar medico
    $(".up-med").click(function(){
        var token = localStorage.getItem("token");
        var id =  $("#id-med").val();
        var cedula =  $("#cedula-med").val();
        var nombres =  $("#nombres-med").val();
        var especialidad =  $("#select-esp").val();
        var phone =  $("#phone-med").val();
        var email =  $("#email-med").val();       
        $.ajax({  
            type: "PUT",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/medico/"+id,
            data: {
                cedula: cedula,
                nombres: nombres,
                especialidades: especialidad,
                telefono: phone,
                email: email
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#doctor").empty(); 
                dataMedico();  
                $('#add-med').modal("close");                
            }, 
        });        
    });
    // buscar dentro de las tablas
    $("#search-med").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#doctor tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
   
});
function dataMedico() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/medico/join",    
           dataType: "json", 
           success: function (data){  
               $.each(data, function(i,item){
                   var row = '<tr>'+
                       '<td data-title="ID">' + item.id_med + '</td>' + 
                       '<td data-title="Tipos">' + item.nombres + '</td>' +
                       '<td data-title="Especialidad">' + item.especialidades + '</td>' +
                       '<td data-title="Acción">'+
                           '<a class="update-med btn-floating blue-medical btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_med + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">edit</i></a>'+
                           '<a class="delete-med btn-floating red accent-4 btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_med + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">delete</i></a>'+
                       '</td>' +
                   '</tr>';						 
               $("#doctor").append(row);
           });
        }, 
    });
}
function dataEsp() {
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
            console.log(data);
               $.each(data, function(i,item){                   
                $("#select-esp").append('<option value="'+item.id_esp+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}