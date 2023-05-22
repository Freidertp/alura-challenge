//Creo un objeto que se utiliza para almacenar referencias a los elementos del documento HTML que se seleccionan mediante la función document.querySelector().

const elements = {
   textAreaInput: document.querySelector(".textareainput"),
   inputMic: document.querySelector(".inputmic"),
   button1: document.querySelector(".button1"),
   button2: document.querySelector(".button2"),
   button3: document.querySelector(".button3"),
   textAreaOutput: document.querySelector(".textareaoutput"),
   outputPlay: document.querySelector(".volume"),
   aluraCharacter: document.querySelector(".aluracharacter"),
   outputAreaNotice: document.querySelector(".outputarea .notice"),
   outputAreaButton: document.querySelector(".outputarea .button"),
}

//Es un objeto que mapea las vocales acentuadas con sus equivalentes sin tilde 
const vowelMap = {
   'á': 'a',
   'é': 'e',
   'í': 'i',
   'ó': 'o',
   'ú': 'u',
   'ü': 'u'
};


//Convierte el contenido del area de texto a minúsculas y filtra los caracteres no permitidos
function sanitizeTextAreaInput() {
   elements.textAreaInput.value = elements.textAreaInput.value //Obtengo valor actual del textarea
      .toLowerCase()  //Convierto texto a minúsculas
      .replace(/[áéíóúü]/g, match => vowelMap[match]) // Remplazo vocales con tildes
      .replace(/[^a-zñ ]/g, ""); //Remplazo cualquier caracter a exepción de esos
}



//Muestra los elementos predeterminados en el área del output
function showDefaultOutput() {
   elements.outputPlay.style.display = "none"; //Ocultar el botón de play
   elements.aluraCharacter.style.display = "inline-block"; //Mostrar la imagen de busqueda Alura
   elements.outputAreaNotice.style.display = "flex"; //Mostrar el Outputarea .notice
   elements.textAreaOutput.style.display = "none"; //Restaurar el estado inicial del text outputarea
   elements.outputAreaButton.style.display = "none"; //Ocultar el div del botón copiar
}

//Muestra el resultado en el outputarea.
function showResult(text) {
   elements.aluraCharacter.style.display = "none"; //Ocultar la imagen de busqueda Alura del outputarea
   elements.outputAreaNotice.style.display = "none"; //Ocultar el div notice del outputarea
   elements.outputPlay.style.display = "inline-block" //Mostrado el botón de escuchar
   elements.textAreaOutput.style.display = "inline-block"; //Mostrando el area del resultado
   elements.outputAreaButton.style.display = "inline-block"; //Mostrando el botón de copiar
   elements.textAreaOutput.value = text;
}

//Función de encriptado
function encrypt() {
   let text = elements.textAreaInput.value.trim(); // Eliminar los espacios
   text = text.replaceAll("e", "enter");
   text = text.replaceAll("i", "imes");
   text = text.replaceAll("a", "ai");
   text = text.replaceAll("o", "ober");
   text = text.replaceAll("u", "ufat");

   showResult(text); // Llamar a la función que muestra el resultado, pasandole el parametro necesario
}

//Función de desencriptado
function decrypt() {
   let text = elements.textAreaInput.value.trim(); //Eliminar los espacios
   text = text.replaceAll("enter", "e");
   text = text.replaceAll("imes", "i");
   text = text.replaceAll("ai", "a");
   text = text.replaceAll("ober", "o");
   text = text.replaceAll("ufat", "u");

   showResult(text); // Llamar a la función que muestra el resultado, pasandole el parametro necesario
}

//Funcion para pasar de voz a texto
function startSpeechRecognition() {
   const recognition = new (webkitSpeechRecognition || SpeechRecognition)(); //Creo una instancia del objeto de reconocimiento de voz (webkitSpeechRecognition en navegadores webkit o SpeechRecognition en otros navegadores).
   recognition.lang = "es-ES"; // Establezco el idioma de reconocimiento de voz como español.

   recognition.onstart = function () { // Es un evento que se dispara cuando inicia el reconocimiento de voz
      elements.textAreaInput.setAttribute("placeholder", "Escuchando..."); //Cambio el placeholder a 'Escuchando...' 
      elements.inputMic.style.animation = 'pulse 1s infinite'; // Agrego una animación al microfono 
   };

   recognition.onresult = function (event) { //Es un evento que se dispara cuando se obtiene un resultado de reconocimiento de voz.
      const result = event.results[0][0].transcript; //Se procesa para convertirlo a minúsculas y eliminar caracteres no deseados, y luego se asigna al valor del campo de entrada de texto
      const processedText = result.toLowerCase().replace(/[^a-z0-9áéíóúüñ\s]/g, '');
      elements.textAreaInput.value = processedText;  //Ingreso lo que escuchó el microfono al inputarea
      sanitizeTextAreaInput();  //Limpiar el area del input (evitar caracteres especiales, etc...)
   };

   recognition.onend = function () { //Es un evento que se dispara cuando se termina el reconocimiento de voz. 
      elements.textAreaInput.setAttribute("placeholder", "Ingrese el texto aquí"); //Regreso el estado del placeholder a la normalidad
      elements.inputMic.style.animation = ""; //Regreso el mic a la normalidad (le quito la animación)
   };

   recognition.start(); //Inicio el proceso de reconocimiento de voz
}

//Función para escuchar el texto del outputarea
function playText() {
   const speechSynthesis = window.speechSynthesis; //Creo un objeto de síntesis de voz
   const speechText = new SpeechSynthesisUtterance(elements.textAreaOutput.value);

   speechText.lang = "es-ES"; //Configuro el lenguaje a español
   elements.outputPlay.style.animation = "pulse 1s infinite"; //Agrego una animación a la imagen
   speechSynthesis.speak(speechText); //Reproduzco el texto del outputarea

   speechText.onend = function () {
      elements.outputPlay.style.animation = "none"; //Al finalizar, cancelo la animación
   }
}


//Agrego un listener que ejecuta una función cuando no hay nada escrito
elements.textAreaInput.addEventListener("keyup", () => {
   if (elements.textAreaInput.value.length === 0) {
      showDefaultOutput(); //Llama a la función que muestra todo por defecto

      if (speechSynthesis.speaking) { //Compruebo si está reproduciendo texto
         speechSynthesis.cancel(); //En caso de que sí, lo cancelo
      }
   }
});

//Agrego un listener que ejecuta una función cuando hay algo escrito
elements.button1.addEventListener("click", () => {
   if (elements.textAreaInput.value !== "") {
      encrypt(); //Llamo a la función que encripta
      elements.textAreaOutput.scrollIntoView({ behavior: "smooth" }); //Scrolleo a la sección del outputarea
   }
});

//Agrego un listener que ejecuta una función cuando hay algo escrito
elements.button2.addEventListener("click", () => {
   if (elements.textAreaInput.value !== "") {
      decrypt(); //Llamo a la función que desencripta
      elements.textAreaOutput.scrollIntoView({ behavior: "smooth" }); //Scrolleo a la sección del outputarea
   }
});

//Agrego un listener que ejecuta una función cuando hay algo escrito
elements.button3.addEventListener("click", () => {
   navigator.clipboard.writeText(elements.textAreaOutput.value) //Copia lo que haya en el outputarea
   elements.textAreaOutput.select(); //Selecciono el texto para dar un efecto de copiado listo
   setTimeout(() => { //Agrego un delay para luego aplicar el focus
      elements.textAreaInput.focus(); //Scrolleo y dejo el cursor listo para escribir en el inputarea

   }, 500);
});

elements.inputMic.addEventListener("click", () => {
   startSpeechRecognition();
});

elements.outputPlay.addEventListener("click", () => {
   playText();
})

