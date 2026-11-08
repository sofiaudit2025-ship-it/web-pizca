if (sessionStorage.getItem('cargaVista') !== 'si') {
    document.documentElement.classList.add('mostrar-carga');
    sessionStorage.setItem('cargaVista', 'si');
}


// esto para que la pagina de carga no se repita si seguimos en la misma pestaña