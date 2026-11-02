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