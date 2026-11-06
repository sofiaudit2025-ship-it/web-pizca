setTimeout(function () {
    
    // pantalla de carga
    const pantallaCarga = document.getElementById('pantalla-carga');
    const trenCarga = document.getElementById('tren-carga');
    const recorridoTren = document.getElementById('recorrido-tren');
    const textoCarga = document.getElementById('texto-carga');

    const imagenesCarga = document.querySelectorAll('img');

    const inicioCarga = Date.now();
    const duracionMinima = 1000;

    let imagenesTerminadas = 0;

    // q el tren se mueva de izq a derecha
    function actualizarCarga(porcentaje) {
        const distancia = recorridoTren.clientWidth - trenCarga.offsetWidth;
        const desplazamiento = distancia * porcentaje / 100;

        trenCarga.style.transform = 'translateX(' + desplazamiento + 'px)';
        textoCarga.textContent = 'Cargando… ' + porcentaje + '%';
    }

    // esto es para como contar cada imagen de la web que va terminando de cargar, para saber cuando está la web lista
    function contarImagen() {
        imagenesTerminadas++;

        const porcentaje = Math.round(
            imagenesTerminadas / imagenesCarga.length * 90
        );

        actualizarCarga(porcentaje);
    }

    // y esto para comprobarlas
    imagenesCarga.forEach(function (imagen) {
        if (imagen.complete) {
            contarImagen();
        } else {
            imagen.addEventListener('load', contarImagen);
            imagen.addEventListener('error', contarImagen);
        }
    });


    // completar el recorrido y ocultar la pantalla de carga
    function terminarCarga() {
        actualizarCarga(100);

        const tiempoPasado = Date.now() - inicioCarga;
        const espera = Math.max(500, duracionMinima - tiempoPasado);

        setTimeout(function () {
            pantallaCarga.classList.add('opacity-0', 'invisible');
        }, espera);
    }

    if (document.readyState === 'complete') {
        terminarCarga();
    } else {
        window.addEventListener('load', terminarCarga);
    }

}, 1000);




$(function () {
    $('#pizza-movible').on('click', function () {
        const $img = $(this).find('img');

        // Reiniciamos la animación por si se hace clic varias veces seguidas
        $img.removeClass('pizza-giro');
        void $img[0].offsetWidth; // fuerza el "reflow" para poder relanzarla
        $img.addClass('pizza-giro');
    });

    // Al terminar la animación quitamos la clase
    $('#pizza-movible img').on('animationend', function () {
        $(this).removeClass('pizza-giro');
    });
});

$('#carta article').each(function (i) {
    const imagenIzquierda = i % 2 === 0;
    const $hijos = $(this).children();

    $hijos.eq(0).attr('data-aos', imagenIzquierda ? 'fade-right' : 'fade-left');
    $hijos.eq(1).attr('data-aos', imagenIzquierda ? 'fade-left' : 'fade-right');
});

AOS.init({
    duration: 800,
    offset: 120,
    once: true,
    easing: 'ease-out-cubic',
    disable: function () {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
});

if ($('#resenas').length && $(window).width() >= 768) {
    $('#resenas li').draggable({
        containment: '#resenas',
        stack: '#resenas li'
    });
}







// funcion para mover las pizzas de la portada por toda la página y que vuelvan a su sitio cuando sueltas
$(function () {
    if ($('#inicio').length && $(window).width() >= 768) {
        $('#inicio .pizza-portada').draggable({
            containment: 'document',
            helper: 'clone',
            appendTo: 'body',
            zIndex: 1000,
            cursor: 'grabbing',
            revert: true,
            revertDuration: 1800,

            start: function () {
                $(this).css('opacity', 0);
            },

            stop: function () {
                $(this).css('opacity', '');
            }
        });
    }
});




// Abrir y cerrar el panel del menú
$(function () {
    $('#boton-menu').on('click', function () {
        const abierto = $(this).attr('aria-expanded') !== 'true';

        $('#panel-menu').toggleClass(
            'invisible opacity-0 -translate-y-4',
            !abierto
        );

        $(this).attr('aria-expanded', abierto);
        $(this).text(abierto ? 'Cerrar' : 'Menú');
    });
});



// Fotos de la exposición: clic y deslizamiento
$(function () {
    const carrusel = document.getElementById('carrusel-expo');

    // Este carrusel solo existe en la home
    if (!carrusel) return;

    const fotos = carrusel.querySelectorAll('.foto-expo');
    let actual = 0;
    let inicioX = 0;
    let inicioY = 0;
    let omitirClic = false;

    function cambiarFoto(direccion) {
        actual = (actual + direccion + fotos.length) % fotos.length;

        fotos.forEach(function (foto, i) {
            foto.dataset.pos = (i - actual + fotos.length) % fotos.length;
        });

        $('#estado-expo').text(
            'Foto ' + (actual + 1) + ' de ' + fotos.length
        );
    }

    carrusel.addEventListener('pointerdown', function (evento) {
        if (!evento.isPrimary || evento.button !== 0) return;

        inicioX = evento.clientX;
        inicioY = evento.clientY;
        omitirClic = false;

        carrusel.setPointerCapture(evento.pointerId);
    });

    carrusel.addEventListener('pointerup', function (evento) {
        if (!evento.isPrimary || evento.button !== 0) return;

        const distanciaX = evento.clientX - inicioX;
        const distanciaY = evento.clientY - inicioY;

        if (Math.abs(distanciaX) > 40 &&
            Math.abs(distanciaX) > Math.abs(distanciaY)) {
            cambiarFoto(distanciaX < 0 ? 1 : -1);
            omitirClic = true;
        }
    });

    carrusel.addEventListener('click', function (evento) {
        // Evita cambiar dos veces después de deslizar
        if (omitirClic && evento.detail !== 0) {
            omitirClic = false;
            return;
        }

        cambiarFoto(1);
    });
});
