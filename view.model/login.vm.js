$(document).ready(function(){
    window.history.forward();
    $("#ingresar").click(function(){
        var user =  $("#login_email").val();
        var pass =  $("#login_password").val();
        $.ajax({  
            type: "POST",            
            url: "https://consultorio-ipa.herokuapp.com/auth/login/",
            data: {
                usuario: user,
                password: pass
            },  
            dataType: "json", 
            success: function (resp){
                console.log(resp.token);
                var token = resp.token;
                if(localStorage.getItem('token') !== undefined && localStorage.getItem('token')){                    
                  //Elimina Sidebar
                    localStorage.removeItem('Sidebar');
                }
                localStorage.setItem("token", token);
                url = "view/dashboard.html";
                $(location).attr('href', url);
            }, 
        });        
    });
});