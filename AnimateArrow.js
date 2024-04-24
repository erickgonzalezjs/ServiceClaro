$(document).ready(function(){
    // Script para animar la flecha
    $(".arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#carouselExampleIndicators").offset().top
        }, 1000);
    });

    // Obtener posición inicial de la flecha
    var topPosition = $(".arrow").offset().top;

    // Animación de la flecha
    setInterval(function(){
        $(".arrow").animate({top: (topPosition - 2) + 'px'}, 500, function() {
            $(this).animate({top: topPosition + 'px'}, 500);
        });
    }, 1000);
});

// Función para manejar el envío del formulario con los datos del usuario
function sendUserData() {
    // Comprobamos si todos los datos del usuario han sido ingresados
    if (cedula && apellido && correo && direccion && telefono) {
      // Construir el mensaje con la información del usuario
      const mensaje = `Número del servicio: ${numServicio}\nServicio seleccionado: ${serviceOptions[numServicio - 1]}\nCédula: ${cedula}\nApellido: ${apellido}\nCorreo: ${correo}\nDirección: ${direccion}`;
      
      // Enviar el mensaje por SMS a los números especificados
      enviarSMS(mensaje);
      
      // Reiniciar las variables de usuario para futuras consultas
      cedula = null;
      apellido = null;
      correo = null;
      direccion = null;
      telefono = null;
      numServicio = null;
    } else {
      // Si faltan datos del usuario, mostrar un mensaje de error
      displayMessage("**Por favor, proporciona todos tus datos para continuar.**", 'bot');
    }
  }
  
  // Función para manejar la entrada de usuario y solicitar los datos necesarios
  function handleUserInput(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value.trim();
    document.getElementById('user-input').value = '';
  
    // Validar la entrada del usuario
    if (!validateUserInput(userInput)) {
      displayMessage("**Por favor, ingresa una opción válida.**", 'bot');
      return;
    }
  
    // Si el usuario selecciona un servicio
    if (userInput === "1" || userInput === "2" || userInput === "3" || userInput === "4") {
      numServicio = parseInt(userInput);
      displayMessage(serviceInfo[numServicio - 1], 'bot');
      displayMessage("**¿Estás interesado en este servicio? Escribe Si o No.**", 'bot');
    } else if (userInput.toLowerCase() === "si" || userInput.toLowerCase() === "sí") {
      displayMessage("**Por favor, proporciona tu información para continuar:**", 'bot');
      displayMessage("**- Cédula:**", 'bot');
    } else if (userInput.toLowerCase() === "no") {
      displayMessage("**Te redirigiré al menú de opciones.**", 'bot');
      displayMessage(serviceOptions.join('\n'), 'bot');
    } else {
      if (!cedula) {
        // Validar la cédula ingresada
        if (!(/^\d{10}$/.test(userInput))) {
          displayMessage("➡️ Sólo dígitos en número de tu cédula", 'bot');
          return;
        }
        cedula = userInput;
        displayMessage("**- Apellido:**", 'bot');
      } else if (!apellido) {
        apellido = userInput;
        displayMessage("**- Correo:**", 'bot');
      } else if (!correo) {
        correo = userInput;
        displayMessage("**- Dirección:**", 'bot');
      } else if (!direccion) {
        direccion = userInput;
        displayMessage("**- Teléfono:**", 'bot');
      } else if (!telefono) {
        telefono = userInput;
        // Una vez que se ha ingresado el teléfono, enviar los datos del usuario
        sendUserData();
      }
    }
  }
  
// Función para enviar los datos del usuario por SMS
function sendUserData() {
    const mensaje = `Nuevo usuario registrado:\nServicio: ${serviceOptions[numServicio - 1]}\nCédula: ${cedula}\nApellido: ${apellido}\nCorreo: ${correo}\nDirección: ${direccion}\nTeléfono: ${telefono}`;
    
    // Enviar mensaje por SMS
    enviarSMS(mensaje);
    
    // Redirigir a WhatsApp
    redirectWhatsApp();
  }
  
  // Función para redirigir al usuario a WhatsApp
 // Función para redirigir al usuario a WhatsApp con un número aleatorio
function redirectWhatsApp() {
    // Array con los números de WhatsApp
    const numerosWhatsApp = ['+573218201431', '+573148396004'];
    // Seleccionar un número aleatorio
    const numeroAleatorio = Math.floor(Math.random() * numerosWhatsApp.length);
    const numeroWhatsApp = numerosWhatsApp[numeroAleatorio];
    // Construir la URL de WhatsApp
    const url = `whatsapp://send?phone=${numeroWhatsApp}`;
    // Redirigir al usuario a WhatsApp
    window.location.href = url;
  }
  