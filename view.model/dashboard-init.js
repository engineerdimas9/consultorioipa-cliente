$(document).ready(function(){
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token')){
        window.history.forward();
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
        $('select').formSelect();
        $('.modal').modal();
        $("#consulta-control").show();
        $("#tpaciente").hide();
        $("#esp-medical").hide();
        $("#medical").hide();
    
        $("#cita-control").click(function(){
            $("#tpaciente").hide();
            $("#esp-medical").hide();
            $("#medical").hide();
            $("#consulta-control").show();                   
        });
        $("#tipo").click(function(){
            $("#consulta-control").hide();
            $("#esp-medical").hide();
            $("#medical").hide();
            $("#tpaciente").show();                   
        });
        $("#especialidades").click(function(){
            $("#consulta-control").hide();
            $("#tpaciente").hide();
            $("#medical").hide();
            $("#esp-medical").show();                   
        });
        $("#medico").click(function(){
            $("#consulta-control").hide();
            $("#tpaciente").hide();
            $("#esp-medical").hide();
            $("#medical").show();                    
        });
        $("#logout").click(function(){
            localStorage.removeItem("token");
            url = "../index.html";
            $(location).attr('href', url);        
        });    
    
    }else{
        url = "../index.html";
        $(location).attr('href', url);
    }
   

});
