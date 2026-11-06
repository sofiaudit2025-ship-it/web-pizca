// no funciona el menu movil en la pagina de ofertas, asiq voy a añadir esta pagina para arreglarlo

const botonMenu = document.getElementById('boton-menu');
const panelMenu = document.getElementById('panel-menu');

botonMenu.addEventListener('click', function () {
    const abierto = botonMenu.getAttribute('aria-expanded') !== 'true';

    panelMenu.classList.toggle('invisible', !abierto);
    panelMenu.classList.toggle('opacity-0', !abierto);
    panelMenu.classList.toggle('-translate-y-4', !abierto);

    botonMenu.setAttribute('aria-expanded', abierto);
    botonMenu.textContent = abierto ? 'Cerrar' : 'Menú';
});