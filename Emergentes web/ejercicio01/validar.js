function validarCorreo(correo) {
    let regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexCorreo.test(correo);
  }
  
  let correo = "melanie@gmail.com";
  if (validarCorreo(correo)) {
    console.log("El correo electrónico es válido.");
  } else {
    console.log("El correo electrónico no es válido.");
  }
  