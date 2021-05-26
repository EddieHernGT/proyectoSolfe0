(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        let notas = [];
        let filas = ['uno', 'dos', 'tres', 'cuatro'];

        if (document.getElementById('popup')){
            var pop=document.getElementById('popup');
            pop.addEventListener("click",myFunction)
        }

        if (document.getElementById('menuHam')) {

            var btnmenu = document.getElementById('menuHam');
            var mostrar = 0;

            btnmenu.addEventListener("click", function () {
                var menus = document.querySelector('#nav').style;
                if (mostrar == 0) {
                    menus.display = 'flex';
                    mostrar = 1;
                } else if (mostrar == 1) {
                    menus.display = 'none';
                    mostrar = 0;
                }

            });
        }

        if (document.getElementById('generar')) {

            var btngen = document.getElementById('generar');
            var btnres = document.getElementById('revisar');
            var respuesta = document.getElementById('respuestaNotas');

            btnres.addEventListener("click", validar);
            btngen.addEventListener("click", genNotas);

            document.getElementById('respuestaNotas').addEventListener("keydown", function (e) {
                if (e.keyCode == '13') {
                    document.getElementById('respuestaNotas').focus();
                    validar();
                }
            });
        }

        var audio1 = new Audio('media/do.mp3');
        var audio2 = new Audio('media/re.mp3');
        var audio3 = new Audio('media/mi.mp3');
        var audio4 = new Audio('media/fa.mp3');
        var audio5 = new Audio('media/sol.mp3');
        var audio6 = new Audio('media/la.mp3');
        var audio7 = new Audio('media/si.mp3');
        var audio8 = new Audio('media/do2.mp3');

        if (document.getElementById('tocar')) {

            var btntoc = document.getElementById('tocar');
            var notasAT = document.getElementById('notasAT');

            btntoc.addEventListener("click", tocar);

            document.getElementById('notasAT').addEventListener("keydown", function (e) {
                if (e.keyCode == '13') {
                    tocar();
                }
            });

        }

        //*********** Modo Practica ************


        //** Validar si la respuesta del usuario es correcta **/
        function validar() {
            var respuestaC = notas[0] + notas[1] + notas[2] + notas[3];
            var respNotas = normalizar(respuesta.value);
            if (respNotas == '') { //alerta para cadenas vacias
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No se puede tener una respuesta vacia',
                    showConfirmButton: false,
                    timer: 2500
                });
                respuesta.focus(); //centra al usuario en el campo respuesta
            } else if (respNotas == respuestaC) { //alerta respuesta correctas
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Perfecto!',
                    showConfirmButton: false,
                    timer: 2500
                });
                genNotas(); //genera nuevas notas
                respuesta.value = ' '; //limpia el campo respuestas
            } else {
                Swal.fire({ //alerta respuesta incorrecta
                    position: 'center',
                    icon: 'error',
                    title: 'Intentalo de nuevo',
                    showConfirmButton: false,
                    timer: 2000
                });
                respuesta.value = ' '; //limpia el campo respuestas
            }
        }

        //** Normaliza la entrada de texto del usuario **
        function normalizar(cadena) {
            return cadena.replace(/ /g, "").toLowerCase(); //quita los espacios y lo pasa a minusculas
        }

        //***** Genera cadenas notas *****
        function genNotas() {
            notas = [];
            for (var i = 0; i < 4; i++) {
                notas.push(genNota()); //manda llamar la generacion de notas
            }
            for (var i = 0; i <= 3; i++) {
                mostrarNota(filas[i], notas[i]); //cambia la columna de notas para mostrar

            }
        }

        //***** Genera nuevas notas *****
        function genNota() {
            var nota = '';
            var rdm = Math.floor((Math.random() * 8) + 1); //genera notas random
            switch (rdm) {
                case 1:
                    nota = 'do';
                    return nota;
                    break;
                case 2:
                    nota = 're';
                    return nota;
                    break;
                case 3:
                    nota = 'mi';
                    return nota;
                    break;
                case 4:
                    nota = 'fa';
                    return nota;
                    break;
                case 5:
                    nota = 'sol';
                    return nota;
                    break;
                case 6:
                    nota = 'la';
                    return nota;
                    break;
                case 7:
                    nota = 'si';
                    return nota;
                    break;
                case 8:
                    nota = 'do';
                    return nota;
                    break;
                default:
                    break;
            }
        }

        //*********** Modo Libre ************/

        /****Obtiene las notas que se desean tocar****/
        function tocar() {
            ocultarNotas()
            let er = /(do|re|mi|fa|sol)+/g;
            notas = [];
            notas = notasAT.value.match(er);
            if (notas[0].length > 3) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Por favor, separa las notas con espacios',
                    showConfirmButton: false,
                    timer: 2500
                });
                notasAT.value = '';
                respuesta.focus();
            } else if (notas[0].length == 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Campo vacio',
                    showConfirmButton: false,
                    timer: 2500
                });
                notasAT.value = '';
                respuesta.focus();
            } else {
                for (var i = 0; i <= 3; i++) {
                    mostrarNota(filas[i], notas[i]); //cambia la columna de notas para mostrarla
                }
            }
        }

        //***** Activa las imagenes de las notas *****
        function mostrarNota(nofNota, noNota) {
            var select = document.querySelector('#' + nofNota).querySelector('.' + nofNota + ' .' + noNota);
            switch (noNota) {
                case 'do': //al haber dos do, se va a mostrar cualquiera de las dos, de manera aleatoria
                    var rdm = Math.floor((Math.random() * 2) + 1);
                    var dos = document.querySelector('#' + nofNota);
                    if (rdm == 1) {
                        dos.querySelector('.' + nofNota + ' .do').style.display = 'block';
                        audio1.play();
                    }
                    if (rdm == 2) {
                        dos.querySelector('.' + nofNota + ' .do2').style.display = 'block';
                        audio8.play();
                    }
                    break;
                case 're':
                    select.style.display = 'block';
                    audio2.play();
                    break;
                case 'mi':
                    select.style.display = 'block';
                    audio3.play();
                    break;
                case 'fa':
                    select.style.display = 'block';
                    audio4.play();
                    break;
                case 'sol':
                    select.style.display = 'block';
                    audio5.play();
                    break;
                case 'la':
                    select.style.display = 'block';
                    audio6.play();
                    break;
                case 'si':
                    select.style.display = 'block';
                    audio7.play();
                    break;
            }

        }

        //***** Ocultas las nototas anteriores para mostrar nuevas *****
        function ocultarNotas() {
            for (var j = 0; j < 4; j++) {
                var nofNota=filas[j]
                var select = document.querySelector('#' + nofNota);
                for (var i = 0; i <= 7; i++) {
                    switch (i) {
                        case 0:
                            select.querySelector('.' + nofNota + ' .do').style.display = 'none';
                            break;
                        case 1:
                            select.querySelector('.' + nofNota + ' .re').style.display = 'none';
                            break;
                        case 2:
                            select.querySelector('.' + nofNota + ' .mi').style.display = 'none';
                            break;
                        case 3:
                            select.querySelector('.' + nofNota + ' .fa').style.display = 'none';
                            break;
                        case 4:
                            select.querySelector('.' + nofNota + ' .sol').style.display = 'none';
                            break;
                        case 5:
                            select.querySelector('.' + nofNota + ' .la').style.display = 'none';
                            break;
                        case 6:
                            select.querySelector('.' + nofNota + ' .si').style.display = 'none';
                            break;
                        case 7:
                            select.querySelector('.' + nofNota + ' .do2').style.display = 'none';
                            break;
                    }
                }
            }
        }
        function myFunction() {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");
          }
    });
})();