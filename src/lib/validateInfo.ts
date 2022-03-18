export function validateMail(values) {
  let errors: any = {};
  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  return errors;
}
export function validateReportInfo(values) {
  let errors: any = {};
  if (!values.nombre) {
    errors.nombre = "Nombre de mascota requerido";
  }
  if (!values.picture) {
    errors.picture = "Imagen requerida";
  }
  if (!values.lat) {
    errors.lat = "Location requerida";
  }
  return errors;
}
export function validateInfo(values) {
  let errors: any = {};
  if (!values.fullName) {
    errors.fullName = "Nombre requerido";
  }
  if (!values.password) {
    errors.password = "Contraseña requerida";
  } else if (values.password.length < 6) {
    errors.password = "Mayor a 6 caracteres";
  }
  if (!values.password2) {
    errors.password2 = "Contraseña requerida";
  } else if (values.password2 != values.password) {
    errors.password2 = "Las contraseñas no coinciden";
  }
  return errors;
}

export function validatePassword(values) {
  let errors: any = {};

  if (!values.password) {
    errors.password = "Contraseña requerida";
  } else if (values.password.length < 6) {
    errors.password = "Mayor a 6 caracteres";
  }

  return errors;
}
export function validateReportForm(values) {
  let errors: any = {};
  if (!values.name) {
    errors.name = "Nombre requerido";
  }
  if (!values.phone) {
    errors.phone = "Tu numero telefonico";
  } else if (/"^\d+$"/.test(values.phone)) {
    errors.phone = "Solo numeros";
  }
  if (!values.message) {
    errors.message = "Escribe un mensaje";
  }
  return errors;
}
