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