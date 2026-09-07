const formulario = document.querySelector('.formulario-boletin');
const mensaje = document.querySelector('.mensaje-formulario');
const boton = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const correo = formulario.elements.email.value.trim();

  if (!correo) {
    mensaje.textContent = 'Escribe tu correo electrónico para continuar.';
    formulario.elements.email.focus();
    return;
  }

  const datos = new FormData(formulario);
  datos.set('form-name', formulario.name);
  mensaje.textContent = 'Enviando...';
  boton.disabled = true;

  try {
    const respuesta = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
      },
      body: new URLSearchParams(datos).toString()
    });

    if (!respuesta.ok) {
      throw new Error('No se pudo enviar el formulario.');
    }

    formulario.reset();
    mensaje.textContent = 'Gracias. Tu suscripción fue enviada.';
  } catch (error) {
    mensaje.textContent = 'No se pudo enviar. Intenta nuevamente.';
  } finally {
    boton.disabled = false;
  }
});
