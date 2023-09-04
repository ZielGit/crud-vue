import iziToast from 'izitoast';

export function handleErrors(error) {
  if (error.response) {
    const { data } = error.response;
    if (data.errors) {
      for (const key in data.errors) {
        if (Object.hasOwnProperty.call(data.errors, key)) {
          const errorMessages = data.errors[key].join('<br>');
          iziToast.error({
            title: 'Error',
            message: `${key}: ${errorMessages}`,
          });
        }
      }
    } else {
      iziToast.error({
        title: 'Error',
        message: data.message || 'Ocurrió un error en la solicitud.',
      });
    }
  } else {
    iziToast.error({
      title: 'Error de red',
      message: 'No se pudo conectar al servidor.',
    });
  }
}