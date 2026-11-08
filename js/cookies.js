const botonGestionCookies = document.getElementById('gestionar-cookies');
const panelCookies = document.getElementById('panel-cookies');
const preferenciasCookies = document.getElementById('preferencias-cookies');
const botonPreferencias = document.getElementById('ver-preferencias');
const estadisticasCookies = document.getElementById('cookies-estadisticas');


// abrir panel recuperar la elección anterior
botonGestionCookies.addEventListener('click', function () {
    estadisticasCookies.checked =
        localStorage.getItem('cookiesOpcionales') === 'aceptadas';

    preferenciasCookies.classList.add('hidden');
    botonPreferencias.setAttribute('aria-expanded', 'false');

    panelCookies.showModal();
});


// cerrar el panel
document.getElementById('cerrar-cookies').addEventListener('click', function () {
    panelCookies.close();
});

// guardar elección
function guardarCookies(aceptadas) {
    localStorage.setItem(
        'cookiesOpcionales',
        aceptadas ? 'aceptadas' : 'rechazadas'
    );

    panelCookies.close();
}

document.getElementById('aceptar-cookies').addEventListener('click', function () {
    guardarCookies(true);
});

document.getElementById('rechazar-cookies').addEventListener('click', function () {
    guardarCookies(false);
});


// mostrar y ocultar preferencias
botonPreferencias.addEventListener('click', function () {
    preferenciasCookies.classList.toggle('hidden');

    botonPreferencias.setAttribute(
        'aria-expanded',
        !preferenciasCookies.classList.contains('hidden')
    );
});

document.getElementById('guardar-cookies').addEventListener('click', function () {
    guardarCookies(estadisticasCookies.checked);
});