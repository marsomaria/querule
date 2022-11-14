var usuCONECTADO;
var iniciadaS=false;
var r;

/*******************  LOGIN  *******************************************/
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
                r=sessionStorage['usuario'];
                console.log(r);
                console.log('Sesion iniciada con exito');
                
                //let r=JSON.stringify(datos);
                //location.reload();
               
               if(document.getElementById("btnModal") && sessionStorage['usuario']){
                  // popup();
                

                console.log('LOGIN bien');
                    html='';
                    
                    html+= '<div>';
                    html += '<span class="close" onclick="cerrarLOGIN();">x </span>';
                    html += '<img src="Querule1.png">';
                    html += '<h2>LogIn</h2>';
                    html += '<p>'+ ' se ha iniciado sesion correctamente :)</p>';
                    html += '</div>';
            
                    modalLOGIN(html);
               }
            });

            
        }else{
            
            console.log('Error en la peticion fetch');
           
            //popupNO();

            if(document.getElementById("btnModal") &&  !sessionStorage['usuario']){
                console.log('LOGIN mal');
                html='';
                        
                    html+= '<div>';
                    html += '<span class="close" onclick="cerrarLImal();">x </span>';
                    html += '<img src="Querule1.png">';
                    html += '<h2>LogIn</h2>';
                    html += '<p>'+ ' NO SE HA PODIDO INICIAR SESIÓN :(</p>';
                    //html+= '<footer><button onclick="cerrarLImal();">Volver a intentar</button>';
                    html += '</div>';
            
                    window.setTimeout("modalLImal(html)",500);//se ejecuta la funcion tras 500 milisegundos
            }
            
        }
    });
    
    
    return false;
}

function modalLOGIN(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
    
    
}
function cerrarLOGIN(){
    document.querySelector('#capa-fondo').remove();
    location.href='index.html';
}

function modalLImal(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
    
    
}
function cerrarLImal(){
    document.querySelector('#capa-fondo').remove();
    location.href='login.html';
}


/*******************  MENU   *******************************************/
let nombreUS;
var nombreUSlogin;
function tomaMenu(){ // No aparece en el menu la pestaña en la que estas
                    // nO LOGUEADO BIEN
                    // LOGUEADO NO VA
    let menu= document.querySelector('#menu'),
        html='';
 

    if(document.body.getAttribute('data-pagina')!= 'ultimos'){
        html += '<li><a href="index.html"><span class="icon-home"></span><span>Inicio</span></a></li>';  
    }
    if(document.body.getAttribute('data-pagina')!= 'bodyBusqueda'){
        html += '<li><a href="buscar.html"><span class="icon-sechar"></span><span>Buscar</span></a></li>';
    }

    if(sessionStorage['usuario']){
    //cuando el usuario esta logeado
        nombreUS=JSON.parse(sessionStorage['usuario']);
        //console.log(nombreUS.login);
        nombreUSlogin=nombreUS.login;

        if(document.body.getAttribute('data-pagina')!= 'bodyNuevo'){
            html += '<li><a href="nuevo.html"><span class="icon-doc-new"></span><span>Nuevo Articulo</span></a></li>';
        }
        html += '<li id="LOcss" onclick=cerrarSesion(this);><span id="icon-logout" class="icon-logout-1" ></span><span>LogOut (' + nombreUS.login +')</span> </li>';
        


    }else{
    //cuando no esta logueado
    //console.log(menuNOlogueado);

        if(document.body.getAttribute('data-pagina')!= 'bodyLogin') {
            html += '<li><a href="login.html"><span class="icon-login-1"></span><span>LogIn</span></a></li>';
        }
        if(document.body.getAttribute('data-pagina')!= 'bodyRegistro'){
            html += '<li><a href="registro.html"><span class="icon-id-card-o"></span><span>Registrar</span></a></li>';
        }  
    }
    menu.innerHTML += html;
}



/*******************  CERRAR SESION  *******************************************/
function modalLOGOUT(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
    
    
}
function cerrarModalLOGOUT(){
    document.querySelector('#capa-fondo').remove();
    location.href='index.html';
}

function cerrarSesion(){

    //var lo= document.getElementById("icon-logout");
    console.log('Cerramos sesion');
    sessionStorage.removeItem('usuario');
    console.log('Cerramos sesion1');

    html='';
                
        html+= '<div>';
        html += '<img src="Querule1.png">';
        html += '<h2>LogOut</h2>';
        //html += '<p>el usuario' +  'ha cerrado correctamente ';
        
         html += '<p>'+ ' ha CERRADO SESIÓN CORRECTAMENTE</p>';
         
        html+= '<footer><button onclick="cerrarModalLOGOUT();">Aceptar</button>';
        html += '</div>';

    modalLOGOUT(html);
    
    console.log('creamos popup');
    /*if(!sessionStorage['usuario']){
        modalLOGOUT(html);
        //popLOGOUT();
    }*/
}



/************ SACAR  ARTICLOS  INDEX ****************************************/

function pedirInfoArticulo(estaP){
    //peticion ajax tipo get
    
    //le tenemos que pasar el id del articulo
    
    //definimos articulo xhr
    let xhr = new XMLHttpRequest(),
        url='api/articulos/',//id articulo 1
        autorizacion='usuario2:a0c696e672fc38b8899753ee0b077e10f5daa522ef5834af7d36859bf26159d4087eb98ca40ff664518dc9ac9b9edb7910b8e9e5f6d15bb1fee42f0aa3d73d6f';    
    let html='', usu, ttpag, npag;
        url += '?pag=' + estaP + '&lpag=6';    

        if(sessionStorage['usuario']){
            usu = JSON.parse(sessionStorage['usuario']);
        }


    //abrir la conexion
    //3 parametro para que sea asincrona-> sigue ejecutando el codigo javascript
    xhr.open('GET',url, true);
    
    //le decimos lo que queremos ejecutar cuando recibamos la respuesta
    xhr.onload=function(){
        //console.log(xhr.responseText);//para que lo tire a la consola
        
        //lo convertimos en formato javascript
        let r= JSON.parse(xhr.responseText);
        console.log(r);//imprimimos el objeto javascript
        
        


        if(r.RESULTADO=='OK')

            npag= Math.ceil(r.TOTAL_COINCIDENCIAS/6);
            estaP= parseInt(estaP) +1;
            ttpag= '<li p="pa"> <output id="estaP">' + estaP + '</output> de <output id="pFinal">'+npag + '</output></li>';
            document.querySelector(".paginacion>#pa").innerHTML=ttpag;


        //if(sessionStorage)
                for(let x=0; x<r.FILAS.length; x++){
                    console.log('creo el articulo '+ x);

                    html += '<article>';
                   html += '<a href="articulo.html?' + r.FILAS[x].id+ '"><img src="./fotos/articulos/' + r.FILAS[x].imagen +'" alt="'+r.FILAS[x].id+'" > </a>';
                   
                //    html += '<ul class="imgArticulo">';
                //     html += '<li> <a class="icon-left-open"></a> </li>';
                //     html += '<li> ' + r.FILAS[x].nfotos +' </li>';
                //     html += '<li> <a class="icon-right-open-1"></a> </li>';
                //     html += '</ul>';
                let fecha=(r.FILAS[x].fecha).split(' ');
                console.log(fecha);
                let dia= fecha[0].split('-');
                console.log(dia);

                let mes=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                html += '<p class="datos" id="fex"><a class="icon-calendar">';
                switch(dia[1]){
                    case '01': html += '<time>' + dia[2] +'-' + mes[0] + '-' + dia[0] + '</time>';
                        break;
                    case '02': html += '<time>' + dia[2] +'-' + mes[1] + '-' + dia[0] + '</time>';
                        break;
                    case '03': html += '<time>' + dia[2] +'-' + mes[2] + '-' + dia[0] + '</time>';
                        break;
                    case '04': html += '<time>' + dia[2] +'-' + mes[3] + '-' + dia[0] + '</time>';
                        break;
                    case '05': html += '<time>' + dia[2] +'-' + mes[4] + '-' + dia[0] + '</time>';
                        break;
                    case '06': html += '<time>' + dia[2] +'-' + mes[5] + '-' + dia[0] + '</time>';
                        break;
                    case '07': html += '<time>' + dia[2] +'-' + mes[6] + '-' + dia[0] + '</time>';
                        break;
                    case '08': html += '<time>' + dia[2] +'-' + mes[7] + '-' + dia[0] + '</time>';
                        break;
                    case '09': html += '<time>' + dia[2] +'-' + mes[8] + '-' + dia[0] + '</time>';
                        break;
                    case '10': html += '<time>' + dia[2] +'-' + mes[9] + '-' + dia[0] + '</time>';
                        break;
                    case '11': html += '<time>' + dia[2] +'-' + mes[10] + '-' + dia[0] + '</time>';
                        break;
                    case '12': html += '<time>' + dia[2] +'-' + mes[11] + '-' + dia[0] + '</time>';
                        break;
                }

            html +='</a></p>';



                    html += '<h3>' + r.FILAS[x].nombre + '</h3>';
                    html += '<hr>';
                    html += '<p class="datos">' + r.FILAS[x].nfotos + '<span class="icon-picture"></span></p>';
                    html += '<p class="datos">' + r.FILAS[x].precio + '<span class="icon-euro"></span></p>';
                    html += '<p class="datos">' + r.FILAS[x].veces_visto + '<span class="icon-eye"></span></p>';
                    html += '<p class="datos">' + r.FILAS[x].nsiguiendo + '<span class="icon-adult"></span></p>';
                    html += '<hr>';
                    html += '<footer class="ellipsis">' + r.FILAS[x].descripcion + ' </footer>';
                     
                    html += '</article>';
                    console.log('cierro articulo' +x);

                };
                document.querySelector('section>div').innerHTML = html;
        
            
        
        
    };    //pasamos la cabecera con el usuario logeado
    xhr.setRequestHeader('Authorization', autorizacion);
    
    xhr.send();
}

function dameArticulos(){
    pedirInfoArticulo(0);
}

function paguno(){
    pedirInfoArticulo(0);
}

function pagmenos(){
    if(document.querySelector('#estaP').value>1){
        console.log('cambiamos a la pagina anterior');
        pedirInfoArticulo(parseInt(document.querySelector('#estaP').value)-2);
    }
}

function pagmas(){
    if(document.querySelector('#estaP').value < document.querySelector('#pFinal').value ){
        console.log('cambiamos a la pagina siguiente');
        pedirInfoArticulo(parseInt(document.querySelector('#estaP').value));
    }
}

function pagultima(){
    pedirInfoArticulo(parseInt(document.querySelector('#pFinal').value) -1 );
}


/**********   caja busqueda INDEX********************** */

function buscaloINDEX(){
    let url='buscar.html?t=';
    let contenido;

    if(document.getElementById('busca').value != ''){
        contenido = (document.getElementById('busca').value).split(' ');
        
        //saco a la consola el texto a buscar
        console.log(document.getElementById('busca').value);
        // y el texto separado por espacios
        console.log(contenido);


        //recorro el contenido caracter por caracter
        //y lo añado a la url
        for( let x=0; x<contenido.length; x++){
            url += contenido[x];

            if(x<contenido.length-1){
                url += '%';
            }
        }
        console.log(url);
        location.href=url;

    }
}

/*******************  BUSCAR *********************************** */
var plbr;
function leerURL(){
    let url = location.search.substring(1), palabras = url.split('='), palDes, descr = '';
    console.log(url);
    console.log(palabras);
    plbr=palabras;

    switch (palabras[0]){
        case 'v': console.log('vendedor');
				document.getElementById('vendedor').value = palabras[1];
				console.log(document.getElementById('vendedor').value);
                break;
                
        case 't': console.log('texto');
                palDes = palabras[1].split('%');
                console.log(palDes);
                for(let i = 0; i < palDes.length; i++){
                    descr = descr + palDes[i];
                    if(i < (palDes.length)-1){
                        descr = descr + ',';
                    }
                }
                document.getElementById('texto').value = descr;
                console.log(document.getElementById('texto').value);
                break;
    }
    busco(0);
    return false;
}

function busco(estaP){
    let url='api/articulos?',
        xhr= new XMLHttpRequest();
    let  texto='', vend='', cat='', pvp1='',
         pvp2='', np='', p='', npag, ttpag;
    
    let artxpag;
    
    if(document.getElementById("artpg").value != ''){
        artxpag=np;
    }else{
        artxpag=6;////////////////////////////////////////////////////////////////////////////////
    }


    if(document.getElementById("pag").value != ''){
        p = document.getElementById("pag").value;
        //url += 'pag='+ p;

            estaP=p-1;
    }
    if(document.getElementById("artpg").value != ''){
        np = document.getElementById("artpg").value;
        //url += '&lpag=' +np;
        artxpag=np;
    }


        //url += 'pag=' + estaP +'&lpag=2';
        url += 'pag=' + estaP +'&lpag=' + artxpag;

        console.log(estaP);

        //por texto en nombre o descripcion
        if(document.getElementById("texto").value != ''){
            texto = document.getElementById("texto").value;
            url += '&t='+ texto;
            console.log(texto);
        }
        //por articulos del usuario indicado
        if(document.getElementById("vendedor").value != ''){
            vend = document.getElementById("vendedor").value;
            url += '&v='+ vend;
        }
        //por la categoria indicada
        if(document.getElementById("categoria").value != ''){
            cat = document.getElementById("categoria").value;
            url += '&c='+ cat;
        }
        //por el precio
        if(document.getElementById("desde").value != ''){
            pvp1 = document.getElementById("desde").value;
            url += '&pd='+ pvp1;
        }
        if(document.getElementById("hasta").value != ''){
            pvp2 = document.getElementById("hasta").value;
            url += '&ph='+ pvp2;
        }

        //por articulos en venta del usuario
        if(document.getElementById("enVenta").checked){
            url += 'mios';
           
        }
        //por articulos seguidos por el usuario
        if(document.getElementById("seguidos").checked){
            url += 'siguiendo';
        }

        //por paginacion
       
        console.log(url);
        

        if(texto!='' || vend != '' || cat!='' || pvp1!='' || pvp2!='' || p!='' || np!='' ){
            //if(document.getElementById("bBuscar")){
                xhr.open('GET', url, true);
                xhr.onload= function(){
                    let r=JSON.parse(xhr.responseText);
                    console.log(r);
                   
                    if(r.RESULTADO == 'OK'){
                        let html='';
                        
                        
                        //npag=Math.ceil(r.TOTAL_COINCIDENCIAS/2);
                        npag=Math.ceil(r.TOTAL_COINCIDENCIAS/artxpag);

                        if(npag== 0){
                            npag=1;
                        }
                        console.log('npag'+ npag);
                        estaP= parseInt(estaP)+1;
                        console.log('estaP'+estaP);
                        
                        ttpag='<p><output id="pEstoyBusc">' + estaP + '</output> de <output id="pFinalBusc">' + npag +'</output></p>';
                        document.querySelector('#paginacionBuscar').innerHTML=ttpag;

                   
                            if(r.FILAS.length==0){
                            html += '<p>No hay coincidencias en los resultados</p>'
                        }else{
                            
                            
                                for(let x=0; x<r.FILAS.length; x++){    
                                    console.log('creo el articulo '+ x);

                                    html += '<article>';
                                    html += '<a href="articulo.html?' + r.FILAS[x].id+ '"><img src="./fotos/articulos/' + r.FILAS[x].imagen +'" alt="'+r.FILAS[x].id+'" > </a>';
                                    // html += '<ul class="imgArticulo">';
                                    // html += '<li> <a class="icon-left-open"></a> </li>';
                                    // html += '<li> ' + r.FILAS[x].nfotos +' </li>';
                                    // html += '<li> <a class="icon-right-open-1"></a> </li>';
                                    // html += '</ul>';

                                        let fecha=(r.FILAS[x].fecha).split(' ');
                                        console.log(fecha);
                                        let dia= fecha[0].split('-');
                                        console.log(dia);
                    
                                        let mes=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                                    html += '<p class="datos" id="fex" style="margin=0px;"><a class="icon-calendar">';
                                        switch(dia[1]){
                                            case '01': html += '<time>' + dia[2] +'-' + mes[0] + '-' + dia[0] + '</time>';
                                                break;
                                            case '02': html += '<time>' + dia[2] +'-' + mes[1] + '-' + dia[0] + '</time>';
                                                break;
                                            case '03': html += '<time>' + dia[2] +'-' + mes[2] + '-' + dia[0] + '</time>';
                                                break;
                                            case '04': html += '<time>' + dia[2] +'-' + mes[3] + '-' + dia[0] + '</time>';
                                                break;
                                            case '05': html += '<time>' + dia[2] +'-' + mes[4] + '-' + dia[0] + '</time>';
                                                break;
                                            case '06': html += '<time>' + dia[2] +'-' + mes[5] + '-' + dia[0] + '</time>';
                                                break;
                                            case '07': html += '<time>' + dia[2] +'-' + mes[6] + '-' + dia[0] + '</time>';
                                                break;
                                            case '08': html += '<time>' + dia[2] +'-' + mes[7] + '-' + dia[0] + '</time>';
                                                break;
                                            case '09': html += '<time>' + dia[2] +'-' + mes[8] + '-' + dia[0] + '</time>';
                                                break;
                                            case '10': html += '<time>' + dia[2] +'-' + mes[9] + '-' + dia[0] + '</time>';
                                                break;
                                            case '11': html += '<time>' + dia[2] +'-' + mes[10] + '-' + dia[0] + '</time>';
                                                break;
                                            case '12': html += '<time>' + dia[2] +'-' + mes[11] + '-' + dia[0] + '</time>';
                                                break;
                                        }
                    
                                    html +='</a></p>';




                                    html += '<h3>' + r.FILAS[x].nombre + '</h3>';
                                    html += '<hr>';
                                    html += '<p class="datos">' + r.FILAS[x].nfotos + '<span class="icon-picture"></span></p>';
                                    html += '<p class="datos">' + r.FILAS[x].precio + '<span class="icon-euro"></span></p>';
                                    html += '<p class="datos">' + r.FILAS[x].veces_visto + '<span class="icon-eye"></span></p>';
                                    html += '<p class="datos">' + r.FILAS[x].nsiguiendo + '<span class="icon-adult"></span></p>';
                                    html += '<hr>';
                                    html += '<footer class="ellipsis">' + r.FILAS[x].descripcion + ' </footer>';
                                    
                                    html += '</article>';
                                    console.log('cierro articulo' +x);
                                };
                            
                        }
                        document.querySelector('#busc>div').innerHTML=html;
                    
                    }
                }
                xhr.send();
           
        }

        return false;
}

function pagunoBuscar(){
    busco(0);
}

function pagmenosBuscar(){
    console.log('retrocedemos pagina');
    if(document.getElementById("pag").value!=''){
        document.getElementById("pag").value= '';
        
    }
	if(document.querySelector('#pEstoyBusc').value > 1){
		console.log('cambiamos pagina');
		busco(parseInt(document.querySelector('#pEstoyBusc').value)-2);
    }
    if(document.getElementById("pag").value!=''){
        document.getElementById("pag").value= '';
    }
}

function pagmasBuscar(){
    if(document.querySelector('#pEstoyBusc').value < document.querySelector('#pFinalBusc').value){
		console.log('cambiamos pagina');
		busco(document.querySelector('#pEstoyBusc').value);
	}
}

function pagultimaBuscar(){
    busco(parseInt(document.querySelector('#pFinalBusc').value)-1);
}

/******************* REGISTRO ************************************** */

function meRegistro(form){
    let lDispo=false;
    let pwdBien=false;


    //comprobar si login disponible
    let usuDispo= document.getElementById("mensajeUsu").innerText;
    console.log(usuDispo);
    if(usuDispo=="Usuario disponible"){
        lDispo=true;
    }

    //vemos si las dos contraseñas son iguales
    let pasw=document.getElementById("mensajePwd").innerText;
    console.log(pasw);
    if(pasw=="Contraseñas iguales"){
        pwdBien=true;
    }

    //registramos al nuevo usuario
    let url='api/usuarios/registro',
        fd= new FormData(form),
        xhr= new XMLHttpRequest();

    console.log('usuario:'+ lDispo);
    console.log('contraseña: ' + pwdBien);

    if(lDispo ==true && pwdBien==true){
        xhr.open('POST', url, true);
        console.log('voy a ello');

        xhr.onload=function(){
            console.log(xhr.responseText);
            let res=JSON.parse(xhr.responseText);
            console.log(res);

            if(res.RESULTADO=='OK'){
                //sessionStorage['usuario']=xhr.responseText;
                console.log(xhr.responseText);
                console.log(lDispo);
                form.reset();//vaciamos todos los campos
                
                //estoyRegistrado();//lanzamos mensaje registrado
                console.log('abrimos modal');
                
                let html;
                html+= '<div>';
                html += '<img src="Querule1.png">';
                html += '<h2>Registro</h2>';
                html += '<p>'+ ' USUARIO REGISTRADO CORRECTAMENTE</p>';
                html+= '<footer><button onclick="cerrarModalREGISTRO();">Aceptar</button>';
                html += '</div>';

                modalREGISTRO(html);
            }

        };
        xhr.send(fd);
    }
    return false;


}


function usuDisponible(log){
    let url = 'api/usuarios',
        xhr = new XMLHttpRequest();
    let html ='';


    let usur = document.getElementById("login").value;
    console.log(usur);
    url += '/' + usur;

    xhr.open('GET', url, true);
    xhr.onload = function(){
        let r = JSON.parse(xhr.responseText);
        console.log(r);

        if(usur!= ''){
            

            if(usur.length>4 && usur.length<20){
                if(r.DISPONIBLE==true && r.RESULTADO=='OK'){
                    console.log('usuario disponible');
                    html += '<p class="icon-ok-circled" id="mensajeUsu">Usuario disponible</p>';
                }else{
                    console.log('introduce usuario');
                    html += '<p class="icon-cancel-circled" id="mensajeUsu">Usuario no disponible</p>';
                }
            }else{
                if(usur.length >20){
                    html += '<p class="icon-cancel-circled" id="mensajeUsu" > Usuario demasiado largo </p>';
                    console.log('usuario muy largo');
                }
                
                if(usur.length <4){
                    html += '<p class="icon-cancel-circled" id="mensajeUsu" > Usuario demasiado corto </p>';
                    console.log('usuario muy corto');
                }
            }
        }else{
            console.log('Introduce un nombre de usuario');
            html += '<p class="icon-cancel-circled" id="mensajeUsu">Introduce nombre de usuario</p>';
        }
        document.querySelector('#usuCorrecto').innerHTML=html;
    };
    xhr.send();

    return false;
}

function cojoPasw(){
    let html='',
        pasw1=document.getElementById("pwd").value;

    console.log(pasw1);

    if(pasw1!=''){
        if(pasw1.length>6 && pasw1.length<20){
        
            html='<p class="icon-cancel-circled" id="mensajePwd"> Confirma contraseña </p>';
            
        }else{
            if(pasw1.length<6 ){
                html='<p class="icon-cancel-circled" id="mensajePwd"> Contraseña muy corta </p>';
            }
            if(pasw1.length>20){
                html='<p class="icon-cancel-circled" id="mensajePwd"> Contraseña muy larga </p>';
            }
        }
    }else{
        html='<p class="icon-cancel-circled" id="mensajePwd"> Introduce contraseña </p>';
    }

    document.querySelector('#pwdCorrecto').innerHTML=html;
    return pasw1;
}

function confirmPasw(){
    let pasw2 = document.getElementById("pwd2").value,
        html='';
    let res=0;

    let pwd1= document.getElementById("pwd").value;
    console.log('pwd1: '+pwd1);
    
    console.log('pwd2: '+pasw2);
    

    
    if(pasw2!='' && pwd1!=''){
        if(pasw2==pwd1 ){
            html= '<p class="icon-ok-circled" id="mensajePwd">Contraseñas iguales</p>';
        }else{
            html= '<p class="icon-cancel-circled" id="mensajePwd"> Contraseñas no coinciden</p>';
            res=1;
        }
    }else{
        if(pasw2=='' && pwd1!=''){
            html= '<p class="icon-cancel-circled" id="mensajePwd"> Debes confirmar contraseña</p>';  
        }
        if(pasw2=='' && pwd1==''){
            html= '<p class="icon-cancel-circled" id="mensajePwd"> Debes introducir y confirmar la contraseña</p>';
        }
    }
    document.querySelector('#pwdCorrecto').innerHTML=html;
    return res;

}

/*
function estoyRegistrado(){
    let html='', div;

    div=document.createElement('div');
    div.setAttribute('id','capa-fondo');
    div.classList.add('capa-fondo');

    //creo el modal
    html+= '<div>';
    html += '<img src="Querule1.png">';
    html += '<h2>Registro</h2>';
    //html += '<p>el usuario' +  'ha cerrado correctamente ';
    
     html += '<p>'+ ' USUARIO REGISTRADO CORRECTAMENTE</p>';
     
    html+= '<footer><button onclick="cerrarModalREGISTRO();">Aceptar</button>';
    html += '</div>';

    div.innerHTML=html;
    document.body.appendChild(div);

}*/

function modalREGISTRO(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
    
    
}


function cerrarModalREGISTRO(){
    document.querySelector('#capa-fondo').remove();
    location.href='login.html';
}

function cargarFoto(inp){
    let fr=new FileReader();//lee el archivo de forma asincrona
    
    //cuando este cargado hacemos
    fr.onload=function(){
        //donde tenemos la imagen
        //fr.result
        
        inp.parentNode.querySelector('img').src= fr.result;
    };
    
    fr.readAsDataURL(inp.files[0]);
}

function enviarFoto(btn){
    //peticion tipo fetch
    let url='api/articulos/2/foto',
        usu=JSON.parse(sessionStorage['usuario']),
        //subimos la foto con un fomrdata vacio
        fd = new FormData();
        console.log(usu);
    
    fd.append('fichero', btn.parentNode.querySelector('input').files[0]);
    
    fetch(url, {method:'POST',
                body:fd,
                headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            respuesta.json().then(function(datos){
                console.log(datos);
                
                
            });
        }else{
            console.log('Error en la peticion fetch dar de alta foto');
        }
    });
    
}


/*************************************BOTON LIMPIAR FORMULARIO******/


function limpiarFormulario(){
	document.getElementById("formREGISTRO").reset();
	//document.querySelector("#zonaEtiq").innerHTML = '';
	document.querySelector('#cajafotillos>img').src = 'vacia.jpg';
}

function limpiarNUEVO(){
	document.getElementById("#formNUEVO").reset();
	//document.querySelector("#zonaEtiq").innerHTML = '';
	document.querySelector('#cajafotillos>img').src = 'vacia.jpg';
}


/*********************************BOTON ELIMINAR FOTO ***************/

function eliminarFoto(){
    // document.querySelector('label[for=fich]>img').src = 'vacia.jpg';
    document.querySelector('#cajafotillos>img').src = 'vacia.jpg';
}
function eliminarFoto2(){
    // document.querySelector('label[for=fich]>img').src = 'vacia.jpg';
    document.querySelector('#cajafotillos>img').src = 'vacia.jpg';
}

function eliminarFotoR(){
    // document.querySelector('label[for=fich]>img').src = 'vacia.jpg';
    document.querySelector('section>#ficha-foto>img').src = 'vacia.jpg';
}

/*******************  ARTICULO  *******************************************/
var USUlogin;
var usuVENDE;
var USUarticulo;
var elquevende;

var precioA;
var descA;
var ar;//para guardar el vendedor del articulo
function mostrarArticulo(){
    let idArti =location.search.substring(1);//devuelve la parte de consulta de una URL que incluye el signo de interrogación
    let usur;
    let usulogin;

    if(idArti==''){
        location.href='index.html';
    }

    if(sessionStorage['usuario']){
        usur=JSON.parse(sessionStorage['usuario']);
        usulogin=usur.login;
        console.log(usur);
    }else{
        usulogin="";
    }
    console.log('idArticulo: '+ idArti);

    //url co el id del articulo
    let url='api/articulos/'+ idArti,
        xhr = new XMLHttpRequest();

    xhr.open('GET',url, true);
    xhr.onload=function(){
        let res=JSON.parse(xhr.responseText);
        console.log(res);
        ar=res;
        console.log(ar);


        if(res.RESULTADO=='OK'){
            //sacamos el articulo en pantalla
            console.log('articulo:' + res.FILAS[0].nombre);
            let caracteristicas='';
            USUarticulo=res.FILAS[0].vendedor;
            console.log('USUarticulo: ' +USUarticulo);
            let html='';

            //html += '<div id="art">';
                
                html += '<div class="inicia">';
                    html += '<h2>'+ res.FILAS[0].nombre +'</h2>';
                    html += '<hr>';
                    caracteristicas='nombre';
                html += '</div>';
                
                //html += '<div id="fotacas" >';
                  //  html += '<a href="./fotos/articulos/' + res.FILAS[0].imagen+ '"><img src="./fotos/articulos/' + res.FILAS[0].imagen+ '"></a>';
                    
                                //   html +='<div>';
                                //     html += '<div id="fotacas">';
                                //     console.log('lanzo el script fotosA');
                                //     html += '<script>fotosA();</script>';
                                //     html += '</div>';
                                //     console.log('FOTOSSSSSSSSSSSSSs');
                                //     html +='<ul class="paginacion">';
                                //     html +=   '<span id="nomenos"></span>';
                                //     html +=   '<li onclick="fotomenos();"> <button>-</button> </li>';
                                //     html +=    '<p></p>';
                                //     html +=    '<li onclick="fotomas();"> <button>+</button> </li>';
                                //     html +=    '<span id="nomas"></span>';
                                //     html +='</ul>';
                 //html += '</div>';  
                                //   html +='</div>';
                  caracteristicas+='/imagen';
                // html+= '<ul class="imgArticulo">';
                //     html += '<li><a class="icon-left-open" onclick="fotomenos();"></a></li> ';
                //     html += '<li> '+ res.FILAS[0].imagen+'<li>';
                //     html += '<li><a class="icon-right-open-1" onclick="fotomas();"></a></li>';
                // html += '</ul>';
                
                caracteristicas+='/paginacion';
                

                html += '<div class="inicia">';
                    let fecha=(res.FILAS[0].fecha).split(' ');
                    console.log(fecha);
                    let dia= fecha[0].split('-');
                    console.log(dia);

                    let mes=['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                    html += '<p class="datos" id="fex"><a class="icon-calendar">';
                    switch(dia[1]){
                        case '01': html += '<time>' + dia[2] +'-' + mes[0] + '-' + dia[0] + '</time>';
                            break;
                        case '02': html += '<time>' + dia[2] +'-' + mes[1] + '-' + dia[0] + '</time>';
                            break;
                        case '03': html += '<time>' + dia[2] +'-' + mes[2] + '-' + dia[0] + '</time>';
                            break;
                        case '04': html += '<time>' + dia[2] +'-' + mes[3] + '-' + dia[0] + '</time>';
                            break;
                        case '05': html += '<time>' + dia[2] +'-' + mes[4] + '-' + dia[0] + '</time>';
                            break;
                        case '06': html += '<time>' + dia[2] +'-' + mes[5] + '-' + dia[0] + '</time>';
                            break;
                        case '07': html += '<time>' + dia[2] +'-' + mes[6] + '-' + dia[0] + '</time>';
                            break;
                        case '08': html += '<time>' + dia[2] +'-' + mes[7] + '-' + dia[0] + '</time>';
                            break;
                        case '09': html += '<time>' + dia[2] +'-' + mes[8] + '-' + dia[0] + '</time>';
                            break;
                        case '10': html += '<time>' + dia[2] +'-' + mes[9] + '-' + dia[0] + '</time>';
                            break;
                        case '11': html += '<time>' + dia[2] +'-' + mes[10] + '-' + dia[0] + '</time>';
                            break;
                        case '12': html += '<time>' + dia[2] +'-' + mes[11] + '-' + dia[0] + '</time>';
                            break;
                    }

                html +='</a></p>';
                
                html+= '<p class="datos" id="categ">';
                html += '<a class="icon-tag">' +res.FILAS[0].id_categoria+'. '+ res.FILAS[0].categoria;

                html += '</a></p>';
                html += '</div>';


                html += '<div class="inicia">';
                    html += '<p class="datos" id="price">'+ res.FILAS[0].precio+'<a class="icon-euro"></a> </p>';
                    caracteristicas+='/precio';
                    if(sessionStorage['usuario']){
                        html += '<p class="datos" id="seguido">';
                        if(res.FILAS[0].estoy_siguiendo==1){
                            let idA=res.FILAS[0].id;
                            console.log(idA);
                            
                                html += '<input class="busque" type="submit" value="Dejar de seguir" id="dejS" onclick="marcarNOSeguir();">';
                           
                        }else{
                            
                                html += '<input class="busque" type="submit" value="Seguir" id="bseguir" onclick="marcarSeguir();">';
                            
                        }
                        caracteristicas+='/seguir';
                        html += '</p>';
                    }
                    
                html += '</div>';
                precA=res.FILAS[0].precio;
                // let precioAct = "prec" +res.FILAS[0].id;
                // sessionStorage.setItem(precioAct,prec);
                // console.log(sessionStorage.precAct);

                html += '<div class="inicia">'+ res.FILAS[0].descripcion + '</div>';
                caracteristicas+='/desc';

                descA=res.FILAS[0].descripcion;
                // let descAct="desc" +res.FILAS[0].id;
                // sessionStorage.setItem(descAct,desc);
                // console.log(sessionStorage.descAct);

                html += '<div class="fila">';
                    html += '<h3> Vendedor:  <a href="buscar.html?v='+res.FILAS[0].vendedor +'">'+ res.FILAS[0].vendedor + '</a> </h3>';
                    html += '<img src="./fotos/usuarios/'+ res.FILAS[0].foto_vendedor +'" style="width:20%; heigth:20%;">';
                    caracteristicas+='/vend+img';
                    usuVENDE=res.FILAS[0].vendedor;
                    console.log('usuVENDE' + usuVENDE);

                    let solder=res.FILAS[0].vendedor;
                    let Vendedor = 'Vendedor'+idArti;
                    sessionStorage.setItem(Vendedor,solder);
                    console.log(sessionStorage);
                html += '</div>';

                html += '<div class="inicia">';
                    html += '<h3>Veces visualizado: '+ res.FILAS[0].veces_visto +'<a class="icon-eye"></a></h3>';
                    caracteristicas+='/vis';
                html += '</div>';

                html += '<div class="inicia">';
                    html += '<h3>Seguidores: '+ res.FILAS[0].nsiguiendo +'<a class="icon-adult"></a></h3>';
                    caracteristicas+='/seg';
                html += '</div>';

                html += '<div class="inicia">';
                    html += '<h3><a class="icon-help">Preguntas: <a href="#lasPreguntas"><output id="numPREG">'+ res.FILAS[0].npreguntas +'</output></a></a></h3>';
                    caracteristicas+='/?';
                html += '</div>';

                if(usulogin==res.FILAS[0].vendedor){
                    console.log(nombreUS.login);
                    html +='<input class="modEL" type="button" value="Modificar Articulo" onclick="modificarARTICULOmodal(precA,descA);">';
                    html +='<input class="modEL" type="button" value="Eliminar Articulo" style="background-color:crimson;" onclick="modaleliminarARTICULO();">';
                }else{
                    html+='';
                }

            //html += '<div>';
            elquevende=res.FILAS[0].vendedor;
            console.log(elquevende);
            
            document.querySelector('#art').innerHTML =html;
            console.log(caracteristicas);
        }

    };

    if(sessionStorage['usuario']){
		xhr.setRequestHeader('Authorization', usur.login + ':' + usur.token);
	}
    xhr.send();
    
}


function fotosA(){
    mostrarFotos(0);
    console.log('sacofotos');
}
function mostrarFotos(estaf){
     let idArti =location.search.substring(1);
     
// let idArti=28;
console.log(idArti);
    let xhr= new XMLHttpRequest(), 
        url = 'api/articulos/'+ idArti +'/fotos';

    xhr.open('GET',url,true);
    xhr.onload=function(){
        console.log(xhr.resposeText);
        let r=JSON.parse(xhr.responseText);
        console.log(r);
        // 

        let npag= Math.ceil(r.FILAS.length/1);
            estaf= parseInt(estaf) +1;
            console.log(estaf);
        for(let x=0; x<r.FILAS.length; x++){
            

            let ttpag= '<p> <output id="estaf">' + estaf + '</output> de <output id="fFinal">'+npag + '</output>'+ '(' +r.FILAS[estaf-1].fichero +')'+'</p>';
            document.querySelector(".paginacion>#pa").innerHTML=ttpag;

            // let html='';
            // html+='<span id="nomenos" style="visibility:hidden;height:10px;" value="'+ idArti +'"></span>';
            // document.querySelector(".paginacion>span").innerHTML=html;

            console.log('muesttro foto' + estaf);
        

                let html='';

                html+='<img src="./fotos/articulos/' + r.FILAS[estaf-1].fichero +   '" style="width:80%;">';
                document.querySelector('#fotacas').innerHTML=html;

                
        }     
        // 
    };

    xhr.send();

}

function fotomenos(){
    if(document.querySelector('#estaf').value>1){
        console.log('cambiamos a la foto anterior');
        let sig=parseInt(document.querySelector('#estaf').value) -1;
        console.log(sig);
        mostrarFotos(sig-1);
    }
}

function fotomas(){
    if(document.querySelector('#estaf').value < document.querySelector('#fFinal').value ){
        console.log('estaf='+document.querySelector('#estaf').value);

        console.log('cambiamos a la foto'+parseInt(document.querySelector('#estaf').value));
        mostrarFotos(parseInt(document.querySelector('#estaf').value));
    }
        if(document.querySelector('#estaf').value == document.querySelector('#fFinal').value){
            //let sig=parseInt(document.querySelector('#estaf').value) -1;
            console.log('nohay mas fotos');
            // let html = '<p id="nomas"> No hay mas fotos</p>';
            // document.querySelector('#nomas').innerHTML =html;
           // mostrarFotos(sig-2);
        }
}



function sacaVendedor(){
    
    let idArti= location.search.substring(1);
    
    let xhr = new XMLHttpRequest(),re,rel,yovendo,
        url='api/articulos/'+idArti;
   
    xhr.open('GET',url, true);
    
    xhr.onload=function(){
        //console.log(xhr.responseText);//para que lo tire a la consola
        

        let r= JSON.parse(xhr.responseText);
        console.log('EL ARTICULO');
        console.log(r);//imprimimos el objeto javascript
 
        if(r.RESULTADO=='OK'){
                for(let x=0; x<r.FILAS.length; x++){
                    yovendo=r.FILAS[x].vendedor;
                    console.log(yovendo);
                }
        }
        if(sessionStorage['usuario']){
            re=JSON.parse(sessionStorage['usuario']);
           console.log('ME HE REGISTRADO');
           rel=re.login;
           console.log(rel);
       }else{
           rel="";
       }
        
            
       let idP;
    let idArt= location.search.substring(1);
     let xhr2=new XMLHttpRequest(),yorespondo,resp,
            url2='api/articulos/'+idArt+'/preguntas';
        //saco las preguntas
        xhr2.open('GET',url2, true);
        xhr2.onload = function(){
            let res=JSON.parse(xhr2.responseText);
            console.log(url);
            console.log(res);
            if(res.RESULTADO=='OK'){
                for(let x=0; x<res.FILAS.length; x++){
                   
                    resp=res.FILAS[x].respuesta;
                    idP=res.FILAS[x].id;
                    

                    console.log(idP);
                    if(sessionStorage['usuario']){
                        re=JSON.parse(sessionStorage['usuario']);
                        console.log('ME HE REGISTRADO');
                        rel=re.login;
                        console.log(rel);
                        console.log(res.FILAS[0].vendedor);
                        if(yovendo==rel){
                            console.log('RESPONDOOOOOOOOOOOOOOO');
                            console.log(idP);
                            let html='<input id="idArt" style="visibility:hidden;height:10px;width:10px;" value="'+idArt+'">';
                                html +='<input id="botonRespondo" type="submit" value="Responder" onclick="respondoPREGUNTA();">';
                            document.querySelector('#respuesta').innerHTML=html;
                        }
                   }else{
                       rel="";
                   }
                    

                    // let html='';
                    // if(resp==null){    
                    //     console.log('respuesta null');
                    //     console.log(rel);
                    //     console.log(yorespondo);
                    //     if(yorespondo==rel){
                    //         console.log('RESPONDOOOOOOOOOOOOOOO');
                             
                    //             html +='<input id="botonRespondo" type="submit" value="Responder" onclick="respondoPREGUNTA();">';
                                
                    //         document.querySelector('#respuesta').innerHTML=html;
                    //     }
                    // }

                }
            }
          
            
        
        };
        xhr2.send();
    };
    
    //pasamos la cabecera con el usuario logeado
   // xhr.setRequestHeader('Authorization', autorizacion);
    xhr.send();
    
    
    
    
    
    
    
}




function sacaPreguntas(){
    let idArti= location.search.substring(1);
    let url = 'api/articulos/' + idArti + '/preguntas',
        xhr= new XMLHttpRequest();
    let iniciado;
        xhr.open('GET',url, true);
        xhr.onload = function(){
            let res=JSON.parse(xhr.responseText);
            console.log(url);
            console.log(res);

            if(sessionStorage['usuario']){
                iniciado=JSON.parse(sessionStorage['usuario']);
                console.log(iniciado);
            }

            if(res.RESULTADO=='OK'){
                console.log('empiezo la pregunta');
                let html='';

                for(let x=0; x<res.FILAS.length; x++){
                    html += '<div class="pregunta">';
                        html+= '<div class="imgPregunta" id="usuPreg">';
                            html += '<div class="usuP"><img src="./fotos/usuarios/' + res.FILAS[x].foto_usuario + '" >';
                            html += '<h4>'+res.FILAS[x].login + '</h4></div>';
                            
                            html += '<div class="fechaP">';

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
                            html += '</div>';
                            
                        html += '</div>';
                        html += '<hr>';

                        html += '<input id="idP" style="visibility:hidden;height:10px;" value="'+ res.FILAS[x].id+'">';

                        html+= '<div class="textoPregunta" >';
                            html += '<div class="inicia">';
                                html += '<h4 style="margin-top:0px;">' + res.FILAS[x].pregunta + '</h4>';
                                html += '<section id="respuesta">';
                                console.log(res.FILAS[x].respuesta);
                                
                                        html+='<p>'+res.FILAS[x].respuesta + '</p>';
                                        
                                        let answer=res.FILAS[x].respuesta;
                                        // let Respondido = 'Respondido'+res.FILAS[x].id;
                                        // sessionStorage.setItem(Respondido,answer);
                                        // console.log(sessionStorage);
                                
                                
                                        // if(sessionStorage['usuario']){
                                        //     let us=JSON.parse(sessionStorage['usuario']);
                                        //     let usul=us.login;
                                        //     console.log(usul);
                                        // }else{
                                        //     let usul="";
                                        // }
                                        
                                        // console.log(answer);
                                        // let yv=sacaVendedor();
                                        // console.log(yv);
                                            
                                            // console.log(usuVENDE);
                                            //  if(usul==usuVENDE){
                                                //console.log('soy yo el que vendo');
                                        // if(answer==null){
                                        //     html += 'SIN RESPUESTA';
                                        //         // html += '<input type="submit" name="responder" value="Responder">';
                                        //             //html +='<input id="botonRespondo" type="submit" value="Responder" onclick="respondoPREGUNTA();">';
                                        // }else{
                                        // console.log('SACO RESPUESTAAAA');
                                                     
                                        // }
                                                //console.log('puedo responder');
                                            //}
                                       
                                html += '</section>';

                                
                            html+='</div>';
                        html += '</div>';
                    
                    
                    html += '</div>';
                    //console.log(html);
                }
                document.querySelector('#lasPreguntas>div').innerHTML=html;
            }
        };
        xhr.send();
        sacaVendedor();
}

function respondoPREGUNTA(){
    
    let x =document.getElementById('idP').value;
    console.log(x);

    let a =document.getElementById('idArt').value;
    console.log(a);
    let html='';
    
        html+='<div onsubmit="return enviarRespuesta(this);">';
        html += '<textarea  name="texto" class="cajaPregunta"></textarea>';
        // html += '<div >';
        html += '<input type="submit" value="Enviar respuesta"  id="botonRespondo"  >';
        html+='</div>';
    // html += '</div>';
    document.querySelector('#respuesta').innerHTML=html;

}
/*
function enviarRespuesta(dv){
    let x =document.getElementById('idP').value;
    console.log(x);

    let a =document.getElementById('idArt').value;
    console.log(a);
    
        let url='api/preguntas/' + x +'/respuesta',
            fd= new FormData(dv),
            usu=JSON.parse(sessionStorage['usuario']);
            location.href='articulo.html?=' + a;
        fetch(url,{method:'POST',
                    body:fd,
                    headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
                        //let idA = location.search.substring(1);
                        
                        if(respuesta.ok){
                            
                            respuesta.json().then(function(datos){
                                console.log(datos);
                                location.href='articulo.html?' + a;
                            });
                        }else{
                            console.log('Error en la peticion fetch');
                        }
                    });
                    

            console.log(url);
            location.href='articulo.html?' + a;
            onload.sacaPreguntas();
        
       
        return location.href='articulo.html?' + a;
        
}
*/


function enviarRespuesta(dv){

       let x =document.getElementById('idP').value;
       console.log(x);
    
       let a =document.getElementById('idArt').value;
       console.log(a);
        let xhr = new XMLHttpRequest(),
            url = 'api/preguntas/'+x+'/respuesta',
            fd = new FormData(dv),
            usu=JSON.parse(sessionStorage['usuario']);
        
            console.log(url);
            
    //        if(sessionStorage['usuario']){
    //            let usu = JSON.parse(sessionStorage['usuario']);
    //        }
    
            //xhr.open('POST', url, true);
    
    
            fetch(url,{method:'POST',
                  body:fd,
                  headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
            if(respuesta.ok){
                respuesta.json().then(function(datos){
                    console.log(datos);
                    location.href='articulo.html?' + a;
                });
            }else{
                console.log('Error en la peticion fetch');
                location.href='articulo.html?' + a;
            }
        });
        return false;
    
    }

/**************************************************/
function formularioPregunta(){
    let html='';
    if(!sessionStorage['usuario']){
        html += '<p> Debes hacer <a href="login.html">login</a> para poder dejar una pregunta';
        document.querySelector('#formuMensaje').innerHTML +=html;
    }else{
        cargaFormulario();
    }

}

function cargaFormulario(){
    let xhr= new XMLHttpRequest(),
        url = 'formuPreg.html',
        usur;

        if(sessionStorage['usuario']){
            usur=JSON.parse(sessionStorage['usuario']);
        }

        xhr.open('GET',url,true);
        xhr.onload=function(){
            document.querySelector('#formuMensaje').innerHTML +=xhr.responseText;
        };

        if(sessionStorage['usuario']){
            xhr.setRequestHeader('Authorization', usur.length +':' +usur.token);
        }
        xhr.send();

}

function dejaPregunta(formu){
    let url='api/articulos/',
        xhr= new XMLHttpRequest(),
        fd = new FormData(formu),
        usur;

        usur=JSON.parse(sessionStorage['usuario']);
        let idArticulo=location.search.substring(1);
        url += idArticulo +'/pregunta';

        let err;

        xhr.open('POST',url, true);
        xhr.onload=function(){
            //console.log(xhr.responseText);
            let r=JSON.parse(xhr.responseText); 
            console.log(r);
            if(r.RESULTADO=='OK'){
                err=r.RESULTADO;
                //formu.reset();//vaciamos los campos
                console.log(err);
                document.getElementById('numPREG').innerText = parseInt(document.getElementById('numPREG').innerText) + 1;
                document.getElementsByClassName(pregunta>textoPregunta>inicia).innerText = document.getElementById('txtP').value;
                sacaPreguntas();//sacamos las nuevas preguntas
                POPenviada(err);//lanzamos pop up de pregunta enviada

            }

            if(r.RESULTADO=="ERROR"){
                err=r.RESULTADO;
                POPenviada(err);
            }

        };
        xhr.setRequestHeader('Authorization', usur.login + ':' + usur.token);
	    xhr.send(fd);



//console.log(document.getElementById('txtP').value);
    return false;
}

function hacerPregunta(frm){
    let url='api/articulos/',
        fd= new FormData(frm),
        usu=JSON.parse(sessionStorage['usuario']);

    let idArticulo=location.search.substring(1);
        url += idArticulo +'/pregunta';
        console.log(url);

    fetch(url,{method:'POST',
              body:fd,
              headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            console.log(respuesta);
            respuesta.json().then(function(datos){
                console.log(datos);
                sacaPreguntas();

                console.log('pop pregunta enviada');
                    html='';
                    html+= '<div>';
                    html += '<img src="Querule1.png" class="imgPREGmodal">';
                    html += '<h2>Pregunta</h2>';
                    html += '<p>'+ usu.login +' has enviado la pregunta</p>';
                    html+= '<footer><button onclick="cerrarPOPpregunta();">Aceptar</button>';
                    html += '</div>';
                frm.reset();

                POPenviada(html);
            });
        }else{
            console.log('Error en la peticion fetch');
                    html='';
                    html+= '<div>';
                    html += '<img src="Querule1.png" class="imgPREGmodal">';
                    html += '<h2>Pregunta</h2>';
                    html += '<p>'+ usu.login +' NO SE HA ENVIADO LA PREGUNTA</p>';
                    html+= '<footer><button onclick="cerrarPOPpreguntaNO();">Aceptar</button>';
                    html += '</div>';
                    frm.reset();
            POPenviadaNO(html);
        }
    });
    return false;
}

function POPenviada(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
}

function cerrarPOPpregunta(){
    document.querySelector('#capa-fondo').remove();
}

function POPenviadaNO(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
}

function cerrarPOPpreguntaNO(){
    document.querySelector('#capa-fondo').remove();
    location.href='#txtP';
}
/******************************************************/
function sacaFotos(){

}


function marcarSeguir(){
    let idA= location.search.substring(1);
    let url='api/articulos/'+idA+'/seguir/true',
        usu=JSON.parse(sessionStorage['usuario']);
    
    fetch(url,{method:'POST',
              headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            respuesta.json().then(function(datos){
                console.log(datos);
                // aumentoSeguidor(idA);
                let html = '';
                html += html += '<input class="busque" type="submit" value="Dejar de seguir" id="dejS" onclick="marcarNOSeguir();">';
                document.querySelector('#seguido').innerHTML =html;
                
            });
        }else{
            console.log('Error en la peticion fetch de seguir articulo');
        }
    });
    
}



function marcarNOSeguir(){
    let idA= location.search.substring(1);
    let url='api/articulos/'+idA+'/seguir/false',
        usu=JSON.parse(sessionStorage['usuario']);
    
    fetch(url,{method:'POST',
              headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            respuesta.json().then(function(datos){
                console.log(datos);
                let html='';
                aumentandoSeguir(idArt);
                document.getElementById("seguido").innerHTML=html;
            });
        }else{
            console.log('Error en la peticion fetch de seguir articulo');
        }
    });
}




function modificarARTICULOmodal(precA,descA){
    let html='';

                
    html+= '<form onsubmit=" return modificarArticulo(this);">';
        html += '<img src="Querule1.png" class="perfil">';
        
        html += '<h2 style="margin-top:0px;margin-bottom:0px;">MODIFICAR ARTICLO</h2>';     
        html +='<label class="fil" >Precio</label>';      
        html += '<input type="number" name="precio" placeholder=" ' + precA+ '">';
        html +='<label class="fil">Descripción</label>'; 
        html += '<textarea name="descripcion" placeholder="'+ descA+'" id="txMODIFICAR"></textarea>';
        
        html+= '<footer>';
        html += '<input class="modEL" type="submit" value="Aceptar" style="background-color: #c27878;">';

            html += '<button class="busque" onclick="quitaModal();">Cancelar</button>';
        html+='</footer>';
    html += '</form>';

modalMODIFICAR(html);

console.log('creamos popup'); 


}

function modificarArticulo(frm){
    let idArti =location.search.substring(1);
    let url= 'api/articulos/'+idArti,
        usu=JSON.parse(sessionStorage['usuario']),
        fd = new FormData(frm);
        
    fetch(url,{method:'POST',
                body:fd,
                headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            respuesta.json().then(function(datos){
                console.log(datos);
                location.href='articulo.html?'+idArti;
            });
        }else{
            console.log('Error en la peticion fetch de modificar articulo');
        }
    });
    return false;
}

function modalMODIFICAR(html){
    let div = document.createElement('div');
    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);   
}


function modalELIMINAR(html){
    let div = document.createElement('div');
    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);   
}

function modaleliminarARTICULO(){

        let html='';
                
        html+= '<div>';
            html += '<img src="Querule1.png" class="perfil">';
            html += '<h2 style="color:red;margin-top:0px;">ELIMINAR ARTICULO</h2>';
            
            html += '<p>CONFIRMAR ELIMINACIÓN</p>';           
            html+= '<footer>';
                html += '<button onclick="eliminarArticulo();" style="background-color: crimson;">Aceptar</button>';
                html += '<button onclick="quitaModal();" >Cancelar</button>';
            html+='</footer>';
        html += '</div>';

    modalELIMINAR(html);
    
    console.log('creamos popup');
}


function quitaModal(){//si cancelamos la eliminacion
    document.querySelector('#capa-fondo').remove();
}

function eliminarArticulo(){//si aceptamos la eliminacion
    document.querySelector('#capa-fondo').remove();
    let idA= location.search.substring(1);

    let url='api/articulos/' +idA,
        usu=JSON.parse(sessionStorage['usuario']);

        fetch(url,{method:'DELETE',
                    headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
                if(respuesta.ok){
                    respuesta.json().then(function(datos){
                        console.log(datos);
                        console.log('ARTICULO ELIMINADO');
                        location.href='index.html';
                    });
                }else{
                    console.log('Error en la peticion fetch de elminar articulo');
                }
        });

}


/************************************************************ */

function pedirCategorias(){
    let url ='api/categorias';
    
    fetch(url).then(function(respuesta){
        //si la respuesta la tenemos... 
        if(respuesta.ok){
  
            respuesta.json().then(function(datos){
                console.log(datos);                      //obtenemos en formato javascript
                
                if(datos.RESULTADO =='OK'){
                    //let html='';
                    let m='';
                    m+='<option value=" "></option>';
                    datos.FILAS.forEach(function(e){
                        
                                           
                            m+='<option value="'+e.id+'-' + e.nombre+'" name="'+ e.nombre +'"></option>';
                   
                    });
                   
                   
                    document.querySelector('#category').innerHTML=m;
                    
                    
                }else{
                    console.log('Error: '+ datos.DESCRIPCION);
                }
            });
            
        }else{
            console.log("error en la peticion fetch");
        }
        
        
    });
}

function cerrarVentana(){
    document.querySelector('#zonaF>#cajafotillos').remove();
}

function anyadirFoto(){
    let html='';


                        
let i="'input'";
    
    html+='<div id="cajafotillos" >';
   
        html +='<img id="fot"src="vacia.jpg" alt="imagen por defecto">';

        html+='<input type="file" style="display: none;"onchange="cargarFoto(this);" name="foto" accept="image/png, .jpeg, .jpg, image/gif">';

        html+='<button onclick="this.parentNode.querySelector('+i+').click();"><a class="icon-folder-open">Seleccionar</a> </button>';
        html +='<button class="masFOTOS"><span class="icon-trash-empty" onclick="eliminarFoto();"> </span></button>';
        html+='<span id="poscierro"onclick="cerrarVentana();" ><a class="icon-cancel-circled"></a> </span>';

        html+='</div>';    
     document.querySelector('#zonaF').innerHTML += html;

}


function modalNUEVO(html){
    let div=document.createElement('div');
    //div.id='capa-fondo';//asignar atributo id
    div.setAttribute('id','capa-fondo'); //añadir id al elemento
    // añadimos el elemento al documento html
    div.innerHTML=html;
    //document.querySelector('body').appendChild(div);
    document.body.appendChild(div);
}
function cerrarNUEVO(){
    document.querySelector('#capa-fondo').remove();
    location.href='index.html';
}

function subirNuevoA(frm){
    let xhr = new XMLHttpRequest(),
		url = 'api/articulos',
        fd = new FormData(frm);
        
console.log(url);
    if(sessionStorage['usuario']){
        let usu=JSON.parse(sessionStorage['usuario']);
        


        xhr.open('POST', url, true);
		xhr.onload = function(){
            console.log(xhr.responseText);
            let r = JSON.parse(xhr.responseText);
			console.log(r);
			if(r.RESULTADO =='OK'){
                console.log('articulosubido');
                console.log(r.ID);
                let d=r.ID;
                

                
                /****************************** */
                let url='api/articulos/'+d+'/foto',
                usu=JSON.parse(sessionStorage['usuario']),
                //subimos la foto con un fomrdata vacio
                fd = new FormData();
            
                fd.append('fichero', frm.parentNode.querySelector('#cajafotillos>input').files[0]);
                
                fetch(url, {method:'POST',
                            body:fd,
                            headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
                    if(respuesta.ok){
                        respuesta.json().then(function(datos){
                            console.log(datos);
                            

                            let html='';
                            html+= '<div>';
                            html +='<span class="close" onclick="cerrarNUEVO();">x </span>';
                                html += '<img src="Querule1.png">';
                                html += '<h2 >NUEVO ARTICULO</h2>';
                                
                                html += '<p>Se ha guardado correctamente el artículo<a class="icon-emo-thumbsup"></a></p>';           
                                html+= '<footer>';
                                   
                                    html += '<button onclick="cerrarNUEVO();" >Aceptar</button>';
                                html+='</footer>';
                            html += '</div>';
                            modalNUEVO(html);
                            
                        });
                    }else{
                        console.log('Error en la peticion fetch dar de alta foto');
                    }
                });

                /******************************** */
                //let html='';

            }
        };
        xhr.setRequestHeader('Authorization', usu.login + ':' + usu.token);
		xhr.send(fd);
    }
return false;
}





function suubirN(frm){
 
    let url='api/articulos',
        fd = new FormData(frm),
        usu=JSON.parse(sessionStorage['usuario']);;
    console.log(url);
    fetch(url, {method:'POST',
                body:fd,headers:{'Authorization':usu.login + ':' + usu.token}}).then(function(respuesta){
        if(respuesta.ok){
            
            respuesta.json().then(function(datos){
                console.log(datos);  
                
                
                //para convertirlo a texto
                console.log(JSON.stringify(datos));//lo que necesitaremos guardar en el sessionStorage
                sessionStorage['usuario']=JSON.stringify(datos);
                //subirFotos();
            });
            
        }else{
            console.log('Error en la peticion fetch');
        }
    });
    
    
    return false;
}


function modalIMAGEN(html){
    let div = document.createElement('div');

    div.setAttribute('id','capa-fondo');
    div.innerHTML=html;
    document.body.appendChild(div);
}

function cerrarFoto(){ 
	document.querySelector('#capa-fondo').remove();
	location.href =  'nuevo.html';
}
function cargarImagen(im){
	let fichero = im.files[0], fr = new FileReader;
	let tam = 0;
	console.log(fichero);
	tam = (fichero.size)/1024;
	console.log(tam);
	if(tam > 300){
		console.log('la imagen tiene demasiado peso');
		//let div = document.createElement('div');
		//div.classList.add('capa-fondo');
		let html = '';
        html+= '<div>';
        html += '<span class="close" onclick="cerrarFoto();">x </span>';
        html += '<img src="Querule1.png" class="perfil">';
        html += '<h2>LogIn</h2>';
        html += '<p>'+ ' LA IMAGEN ES DEMASIADO GRANDE </p>';
        html += '<button class="busque" onclick = "cerrarFoto();">Aceptar</button>';
        html += '</div>';

       

		//div.innerHTML = html;
		//document.body.appendChild(div); //añade el div como último hijo
		modalIMAGEN(html);
	}
	else{
		fr.onload = function(){
			//document.querySelector('label[for=fich]').innerHTML = '<label for="fich"><img name="fichero" src="'+fr.result+'" alt="imagen por defecto"></img>'
			document.querySelector('#cajafotillos>img').src = fr.result;
		};
		fr.readAsDataURL(fichero);
	}
}

/*************** BOTON ENTERRR************************************/


function anyadirConEnter(event){
	if(event.keyCode==13){
		buscaloINDEX();
	}
}