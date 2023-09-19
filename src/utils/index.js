import iziToast from 'izitoast';

export const showToastSuccess = (message) => {
  iziToast.success({
    title: 'Éxito',
    message: message,
    position: 'topRight',
  });
};

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
            position: 'topRight',
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