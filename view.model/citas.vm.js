$(document).ready(function(){
    dataCitas();
    dataTipoPaciente();
    dataEspCitas();
    dataMedicoCitas();
    dataGenero();
    dataEstatus();

    // crear un control de citas
    $(".add-consulta").click(function(){
        var token = localStorage.getItem("token");
        var tipo =  $("#select-paciente").val();
        var nombres =  $("#nombre-paciente").val();
        var direccion =  $("#direccion-paciente").val();
        var email =  $("#email-paciente").val();
        var genero =  $("#select-genero").val();
        var nacimiento =  $("#fecha-paciente").val();
        var telefono =  $("#phone-paciente").val();
        var patologia =  $("#patologia-paciente").val();
        var medicamentos =  $("#medica-paciente").val();
        var alergico =  $("#alergia-paciente").val();
        $.ajax({  
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/paciente/",
            data: {
                id_tipo_p: tipo,
                nombres: nombres,
                direccion: direccion,
                email: email,
                genero: genero,
                fecha_nac: nacimiento,
                telefono: telefono,
                patologia: patologia,
                medicamentos: medicamentos,
                alergia: alergico
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#id-paciente").val(resp.id);
                var cita =  $("#cita-paciente").val();
                var fecha_cita =  $("#fecha-cita").val();
                var especialidad =  $("#select-especialidad").val();
                var medico =  $("#select-medico").val();
                var estatus =  $("#select-estatus").val();
                var paciente =  $("#id-paciente").val();
                var diagnostico =  $("#diagnostico").val();
                var observaciones =  $("#observacion").val();
                $.ajax({  
                    type: "POST",
                    beforeSend: function(request) {
                        request.setRequestHeader("x-access-token", token);
                    }, 
                    url: "https://consultorio-ipa.herokuapp.com/cita/",
                    data: {
                        cita: cita,
                        fecha_cita: fecha_cita,
                        id_esp: especialidad,
                        id_med: medico,
                        estatus: estatus,
                        paciente: paciente,
                        diagnostico: diagnostico,
                        observaciones: observaciones,
                    },  
                    dataType: "json", 
                    success: function (respons){
                        $("#citas").empty();
                        dataCitas();
                        $('#citas-control').modal("close"); 
                    },
                });                              
            }, 
        });        
    });

    // abrir modal para actualizar tipo de pacientes
    $("body #citas").on('click', '.update-cita',function(){
        var token = localStorage.getItem("token");
        var id = $(this).attr('id');
        $.ajax({  
            type: "GET",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "http://localhost:4000/cita/"+id,
            dataType: "json", 
            success: function (resp){
                console.log(resp);
                $("#control").val(resp.id_cita);
                $("#id-paciente").val(resp.id_paciente);
                $("#select-paciente option[value="+ resp.id_tipo_p +"]").attr("selected",true).val();
                $("#nombre-paciente").val(resp.nombres);
                $("#direccion-paciente").val(resp.direccion);
                $("#email-paciente").val(resp.email);
                $("#select-genero option[value="+ resp.genero +"]").attr("selected",true).val();
                $("#fecha-paciente").val(resp.fecha_nac);
                $("#phone-paciente").val(resp.telefono);
                $("#patologia-paciente").val(resp.patologia);
                $("#medica-paciente").val(resp.medicamentos);
                $("#alergia-paciente").val(resp.alergia);
                $("#cita-paciente").val(resp.cita);
                $("#fecha-cita").val(resp.fecha_cita);
                $("#select-especialidad option[value="+ resp.id_esp +"]").attr("selected",true).val();
                $("#select-medico option[value="+ resp.id_med +"]").attr("selected",true).val();
                $("#select-estatus option[value="+ resp.estatus +"]").attr("selected",true).val();
                $("#id-paciente").val(resp.id_paciente);
                $("#diagnostico").val(resp.diagnostico);
                $("#observacion").val(resp.observaciones);

                $('select').formSelect();
                $('#citas-control').modal("open");                
            }, 
        });        
    });


    // actualizar un control de citas
    $(".up-cita").click(function(){
        var token = localStorage.getItem("token");
        var id = $("#id-paciente").val();
        var tipo =  $("#select-paciente").val();
        var nombres =  $("#nombre-paciente").val();
        var direccion =  $("#direccion-paciente").val();
        var email =  $("#email-paciente").val();
        var genero =  $("#select-genero").val();
        var nacimiento =  $("#fecha-paciente").val();
        var telefono =  $("#phone-paciente").val();
        var patologia =  $("#patologia-paciente").val();
        var medicamentos =  $("#medica-paciente").val();
        var alergico =  $("#alergia-paciente").val();
        $.ajax({  
            type: "PUT",
            beforeSend: function(request) {
                request.setRequestHeader("x-access-token", token);
            }, 
            url: "https://consultorio-ipa.herokuapp.com/paciente/"+id,
            data: {
                id_tipo_p: tipo,
                nombres: nombres,
                direccion: direccion,
                email: email,
                genero: genero,
                fecha_nac: nacimiento,
                telefono: telefono,
                patologia: patologia,
                medicamentos: medicamentos,
                alergia: alergico
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp); 
                var idcita =  $("#control").val();               
                var cita =  $("#cita-paciente").val();
                var fecha_cita =  $("#fecha-cita").val();
                var especialidad =  $("#select-especialidad").val();
                var medico =  $("#select-medico").val();
                var estatus =  $("#select-estatus").val();
                var paciente =  $("#id-paciente").val();
                var diagnostico =  $("#diagnostico").val();
                var observaciones =  $("#observacion").val();
                $.ajax({  
                    type: "PUT",
                    beforeSend: function(request) {
                        request.setRequestHeader("x-access-token", token);
                    }, 
                    url: "https://consultorio-ipa.herokuapp.com/cita/"+idcita,
                    data: {
                        cita: cita,
                        fecha_cita: fecha_cita,
                        id_esp: especialidad,
                        id_med: medico,
                        estatus: estatus,
                        paciente: paciente,
                        diagnostico: diagnostico,
                        observaciones: observaciones,
                    },  
                    dataType: "json", 
                    success: function (respons){
                        $("#citas").empty();
                        dataCitas();
                        $('#citas-control').modal("close"); 
                    },
                });                              
            }, 
        });        
    });

    // buscar dentro de las tablas
    $("#search-cita").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#citas tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
    function dataCitas() {
    // cargar la tabla de tipos de pacientes
    var token = localStorage.getItem("token");
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/cita/join",    
           dataType: "json", 
           success: function (data){  
               $.each(data, function(i,item){
                   var row = '<tr>'+
                       '<td data-title="Cita">' + item.cita + '</td>' + 
                       '<td data-title="Fecha">' + item.fecha_cita + '</td>' +
                       '<td data-title="Medico">' + item.medico + '</td>' + 
                       '<td data-title="Especialidad">' + item.especialidades + '</td>' +
                       '<td data-title="Estatus">' + item.estatus + '</td>' +
                       '<td data-title="Acción">'+
                           '<a class="update-cita btn-floating blue-medical btn-large waves-effect waves-purple z-depth-5" id="'+ item.id_cita + '" style="height: 35px; width:35px;"><i class="material-icons center" style="font-size: 25px; line-height:25px;">edit</i></a>'+                           
                       '</td>' +
                   '</tr>';						 
               $("#citas").append(row);
           });
           }, 
       });

    
   }
   function dataTipoPaciente() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/tipo/",    
           dataType: "json", 
           success: function (data){  
            console.log(data);
               $.each(data, function(i,item){                   
                $("#select-paciente").append('<option value="'+item.id_tipo_p+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}
function dataEspCitas() {
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
                $("#select-especialidad").append('<option value="'+item.id_esp+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}
function dataMedicoCitas() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/medico/",    
           dataType: "json", 
           success: function (data){  
            console.log(data);
               $.each(data, function(i,item){                   
                $("#select-medico").append('<option value="'+item.id_med+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}
function dataEstatus() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/cita/estatus/",    
           dataType: "json", 
           success: function (data){  
            console.log(data);
               $.each(data, function(i,item){                   
                $("#select-estatus").append('<option value="'+item.id_estatus+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}
function dataGenero() {
    var token = localStorage.getItem("token");
    // cargar la tabla de tipos de pacientes
       $.ajax({  
           type: "GET",
           beforeSend: function(request) {
               request.setRequestHeader("x-access-token", token);
           }, 
           url: "https://consultorio-ipa.herokuapp.com/cita/genero/",    
           dataType: "json", 
           success: function (data){  
            console.log(data);
               $.each(data, function(i,item){                   
                $("#select-genero").append('<option value="'+item.id_genero+'">'+item.nombres+'</option>');
           });
           $('select').formSelect();
        }, 
    });
}