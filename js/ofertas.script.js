const TEXTO_BOTON = 'Copiar código';
const botones = document.querySelectorAll('[data-copiar]');
let temporizador;
 
// Crear el aviso y colocarlo al final del body
const aviso = document.createElement('div');
aviso.id = 'aviso-copiado';
aviso.setAttribute('role', 'status');
aviso.setAttribute('aria-live', 'polite');
aviso.className = 'fixed bottom-6 inset-x-0 mx-auto w-fit max-w-[calc(100%-3rem)] px-6 py-3 rounded-full text-sm text-center pointer-events-none '
    + 'bg-crema text-granate dark:bg-granate dark:text-crema '
    + 'opacity-0 translate-y-4 transition duration-300 motion-reduce:transition-none';
document.body.append(aviso);
 
botones.forEach((boton) => {
    boton.addEventListener('click', async () => {
        const codigo = boton.dataset.copiar;
        let copiado = true;
 
        try {
            await navigator.clipboard.writeText(codigo);
        } catch (error) {
            copiado = false;
        }
 
        botones.forEach((b) => { b.textContent = TEXTO_BOTON; });
        if (copiado) boton.textContent = 'Copiado';
 
        aviso.textContent = copiado
            ? 'Código ' + codigo + ' copiado'
            : 'No se pudo copiar. Tu código es ' + codigo;
        aviso.classList.remove('opacity-0', 'translate-y-4');
 
        clearTimeout(temporizador);
        temporizador = setTimeout(() => {
            aviso.classList.add('opacity-0', 'translate-y-4');
            botones.forEach((b) => { b.textContent = TEXTO_BOTON; });
        }, 2000);
    });
});