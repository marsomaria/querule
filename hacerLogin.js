
function hacerLogin(frm){
 
    let url='api/usuarios/login',
        fd = new FormData(frm);
    console.log('probamos iniciar sesion');
    fetch(url, {method:'POST',
                body:fd}).then(function(respuesta){
        if(respuesta.ok){
            
            respuesta.json().then(function(datos){
                console.log(datos);  
                
                
                //para convertirlo a texto
                console.log(JSON.stringify(datos));//lo que necesitaremos guardar en el sessionStorage
                sessionStorage['usuario']=JSON.stringify(datos);
                console.log('Sesion iniciada con exito');

                
                location.reload();
                //let err=datos.RESULTADO;
                //logueado(eer);
                location.href='index.html';
            
            });

            
            
        }else{
            console.log('Error en la peticion fetch');
        }
    });
    
    
    return false;
}




















<script>
            //if(document.getElementById("btnModal")){
                popup();
               /* var modal = document.getElementById("tvesModal");
                var btn = document.getElementById("btnModal");
                var span = document.getElementsByClassName("close")[0];
                var body = document.getElementsByTagName("body")[0];

                btn.onclick = function() {
                    modal.style.display = "block";
                    body.style.position = "static";
                    body.style.height = "100%";
                    body.style.overflow = "hidden";
                }

                //span.onclick="location.href='index.html'";
                /*span.onclick = function() {
                    /*modal.style.display = "none";
                    body.style.position = "inherit";
                    body.style.height = "auto";
                    body.style.overflow = "visible";
                    
                }

                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                        body.style.position = "inherit";
                        body.style.height = "auto";
                        body.style.overflow = "visible";
                    }
                }
            }*/
            
            //if(document.getElementById("cierrapop"))
                //location.href='index.html';

        </script>






        function modalLOGOUT(html){
            let div = document.createElement('div');
        
            div.setAttribute('id','modalContainer');
            div.innerHTML=html;
            document.body.appendChild(div);
            
            
        }
        function cerrarModalLOGOUT(){
            document.querySelector('#modalContainer').remove();
            location.href='index.html';
        }
        
        function cerrarSesion(){
            
            //let  html;
        /*
            let div = document.createElement('div');
        
            div.setAttribute('id','modalContainer');
            div.innerHTML=html;
            document.body.appendChild(div);
        */
           
            sessionStorage.removeItem('usuario');
            console.log('Cerramos sesion');
        /*
            html = '';
            html += '<div class="modal-content">';
            html += '<img src="Querule1.png">';
            html += '<h2>LogOut</h2>';
            html += '<p>ha cerrado sesión </p>'; 
            hmtml += '<footer> <button onclick="cerrarModalLOGOUT();">Aceptar</button></footer>';
            html += '</div>';
        */
            popLOGOUT();
            console.log('creamos popup');
            
            //modalLOGOUT(html);
        
            /*
        
        
            html = '<div>';
            html += '<h2>Cerrar sesión</h2>';
            html += '<p>Has cerrado sesión correctamente</p>';
            html += '<button class="boton" onclick = "cerrarBien();">Aceptar</button>';
        
            div.innerHTML = html;
            document.body.appendChild(div); //añade el div como último hijo
            
            html += '</div>';*/
            
        
        
        }






        /*
                                html += '<h6>';

                                    let fecha=(res.FILAS[x].fecha_hora).split(' ');
                                    console.log(fecha);
                                    let dia =fecha[0].split('-');
                                    console.log(dia);
                                    let hora= fecha[1].split(':');
                                    console.log(hora);
                                    let mes=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                                    
                                    switch(dia[1]){
                                        case '01': html += '<time>' + dia[2] +'-' + mes[0] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '02': html += '<time>' + dia[2] +'-' + mes[1] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '03': html += '<time>' + dia[2] +'-' + mes[2] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '04': html += '<time>' + dia[2] +'-' + mes[3] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '05': html += '<time>' + dia[2] +'-' + mes[4] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '06': html += '<time>' + dia[2] +'-' + mes[5] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '07': html += '<time>' + dia[2] +'-' + mes[6] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '08': html += '<time>' + dia[2] +'-' + mes[7] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '09': html += '<time>' + dia[2] +'-' + mes[8] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '10': html += '<time>' + dia[2] +'-' + mes[9] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '11': html += '<time>' + dia[2] +'-' + mes[10] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                        case '12': html += '<time>' + dia[2] +'-' + mes[11] + '-' + dia[0] +', ' + hora[0] +':' + hora[1] + '</time>';
                                            break;
                                    }
                                html += '</h6>';
                                */








                                
/*
function tomaMenu2(){
    let menu= document.querySelector('#menu'), html='';

    if(sessionStorage['usuario']){
    //cuando el usuario esta logeado
        let nombreUS=JSON.parse(sessionStorage['usuario']);
        console.log(nombreUS.login);

            html += '<li><a href="index.html"><span class="icon-home"></span><span>Inicio</span></a></li>';
            html += '<li><a href="buscar.html"><span class="icon-sechar"></span><span>Buscar</span></a></li>';
            html += '<li><a href="nuevo.html"><span class="icon-doc-new"></span><span>Nuevo Articulo</span></a></li>';
            html += '<li><a href="index.html" onclick=cerrarSesion(this);><span class="icon-logout-1"></span><span>LogOut (' + nombreUS.login +')</span></a></li>';
        

    }else{
    //cuando no esta logueado
    //console.log(menuNOlogueado);
       
        html += '<li><a href="index.html"><span class="icon-home"></span><span>Inicio</span></a></li>';
        html += '<li><a href="buscar.html"><span class="icon-sechar"></span><span>Buscar</span></a></li>';
        html += '<li><a href="login.html"><span class="icon-login-1"></span><span>LogIn</span></a></li>';
        html += '<li><a href="registro.html"><span class="icon-id-card-o"></span><span>Registrar</span></a></li>';
         
        
    }
    menu.innerHTML += html;
}*/

/*c 
function sacaLOS(){
    cargaPags(0);

}
function cargaPags(esta){
    let xhr = new XMLHttpRequest, url='api/articulos', usua, pagTotal, numP, html='';
    ur= url+ '?pag=' +esta +'&lpag=6';

    if(sessionStorage['usuario']){
		usua = JSON.parse(sessionStorage['usuario']);
	}
    xhr.open('GET', url, true);
    xhr.onload=function(){
        let ar = JSON.parse(xhr.responseText);
        console.log(ar);
        
        if(ar.RESULTADO =='OK'){
            numP=Math.ceil(ar.TOTAL_COINCIDENCIAS/6);
            esta=parseInt(esta)+1;
        }
        pagTotal= '<p> <output id="pEsta">' + esta + '</output> de <output id="pUltima">' + numP +'</output></p>';
        document.querySelector("#paginacion").innerHTML = pagTotal;

        for(let x=0; x<ar.FILAS.length; x++){
            html += '<article>';
            html += '<a href="foto.html?' + ar.FILAS[x].id+ '"><div><img src="./fotos/' + ar.FILAS[x].fichero + '! alt="' + ar.FILAS[x].id + '"></div>' + '</a>';
            html+= '<h3>' + ar.FILAS[x].nombre + '</h3>';
            html += '<hr>';
            html += '<p class="datos">' + ar.FILAS[x].id +'<span class="icon-picture"></span>';
            html += '<p class="datos">' + ar.FILAS[x].precio +'<span class="icon-euro"></span>';
            html += '<p class="datos">' + ar.FILAS[x].veces_visto +'<span class="icon-eye"></span>';
            html += '<p class="datos">' + ar.FILAS[x].precio +'<span class="icon-euro"></span>';

            ar.FILAS[x].descripcion + '"></div>' + '</a>'

        }

    }
}*/