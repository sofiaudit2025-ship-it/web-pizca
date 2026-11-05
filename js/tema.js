const raiz = document.documentElement;
const botonTema = document.querySelector('#boton-tema');
const icono = botonTema.querySelector('i');

function aplicarTema(oscuro) {
    raiz.classList.toggle('dark', oscuro);
    botonTema.setAttribute('aria-pressed', String(oscuro));
    icono.classList.toggle('fa-moon', !oscuro);
    icono.classList.toggle('fa-sun', oscuro);
}

// Al cargar: ¿eligió oscuro la última vez?
aplicarTema(localStorage.getItem('tema') === 'oscuro');

botonTema.addEventListener('click', function () {
    const oscuro = !raiz.classList.contains('dark');
    aplicarTema(oscuro);
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
});