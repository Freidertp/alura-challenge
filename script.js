// Seleccionar los botones y áreas de texto
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const textAreaInput = document.querySelector(".textareainput");
const textAreaOutput = document.querySelector(".textareaoutput");

/*
 * Establecer el enfoque en el área de texto y seleccionar todo al cargar la página.
 * Esto asegura que el cursor esté listo para empezar a escribir.
 */
const textarea = document.querySelector("textarea");
textarea.focus(); // Establecer el enfoque en el área de texto
textarea.select(); // Seleccionar todo el contenido del área de texto


/**
 * Convierte el contenido del área de texto a minúsculas y filtra los caracteres no permitidos.
 */
function sanitizeTextAreaInput() {
    textAreaInput.value = textAreaInput.value.toLowerCase();
    textAreaInput.value = textAreaInput.value.replace(/[^a-zñ ]/g, "");
}

/**
 * Muestra los elementos predeterminados en el área de salida.
 */
function showDefaultOutput() {
    const aluraCharacterImage = document.getElementById("aluracharacter");
    const noticeDiv = document.querySelector('.outputarea .notice');
    const textAreaOutput = document.querySelector(".textareaoutput");
    const button = document.querySelector(".button");

    aluraCharacterImage.style.display = "block"; // Mostrar la imagen de búsqueda de Alura
    noticeDiv.style.display = "flex"; // Mostrar el div.notice

    textAreaOutput.style.display = "none"; // Restaurar el estado inicial del área de salida
    button.style.display = "none"; // Ocultar el botón
}


/*
 * Muestra el resultado en el área de salida.
 */
function showResult() {
    const aluraCharacterImage = document.getElementById("aluracharacter");
    const noticeDiv = document.querySelector('.outputarea .notice');
    const textAreaOutput = document.querySelector(".textareaoutput");
    const button = document.querySelector(".button");

    aluraCharacterImage.style.display = "none"; // Ocultar la imagen
    noticeDiv.style.display = "none"; // Ocultar el div.notice

    textAreaOutput.style.display = "block"; // Mostrar el área de salida
    button.style.display = "block"; // Mostrar el botón de copiar
    textAreaOutput.value = textAreaOutput.value; // Mostrar el mensaje
}

/**
 * Encripta el contenido del área de entrada.
 */
function encrypt() {
    let text = textAreaInput.value.trim(); // Eliminar los espacios
    text = text.replaceAll("e", "enter");
    text = text.replaceAll("i", "imes");
    text = text.replaceAll("a", "ai");
    text = text.replaceAll("o", "ober");
    text = text.replaceAll("u", "ufat");
    textAreaOutput.value = text;

    showResult(); // Llamar a la función para mostrar el resultado
}

/**
 * Desencripta el contenido del área de entrada.
 */
function decrypt() {
    let text = textAreaInput.value.trim();
    text = text.replaceAll("enter", "e");
    text = text.replaceAll("imes", "i");
    text = text.replaceAll("ai", "a");
    text = text.replaceAll("ober", "o");
    text = text.replaceAll("ufat", "u");
    textAreaOutput.value = text;

    showResult(); // Llamar a la función para mostrar el resultado
}


/**
 * Procesa el texto dado, convirtiéndolo a minúsculas y eliminando caracteres no deseados.
 * @param {string} text - El texto a procesar.
 * @returns {string} El texto procesado.
 */
function processText(text) {
    text = text.toLowerCase();
    text = text.replace(/[^a-z0-9áéíóúüñ\s]/g, '');
    return text;
}

/*
 * Inicia el reconocimiento de voz y actualiza el área de entrada con el texto reconocido.
 */
function startSpeechRecognition() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = 'es-ES';

    recognition.onresult = function (event) {
        const result = event.results[0][0].transcript;
        const textarea = document.querySelector('.textareainput');
        const processedText = removeAccentMarks(result.toLowerCase());
        textarea.value = processedText;
    };

    recognition.onerror = function (event) {
        console.log('Error en el reconocimiento de voz: ' + event.error);
    };

    recognition.start();
}

/**
 * Elimina las marcas de acento del texto dado.
 * @param {string} text - El texto con marcas de acento.
 * @returns {string} El texto sin marcas de acento.
 */
function removeAccentMarks(text) {
    const accentMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ü': 'u',
        'ñ': 'n'
    };

    return text.replace(/[áéíóúüñ]/g, match => accentMap[match]);
}


/**
 * Maneja el evento de clic en el botón 1. Si el área de entrada no está vacía, llama a la función de encriptación.
 */
button1.addEventListener("click", () => {
    if (textAreaInput.value !== "") {
        encrypt();
    }
});

/**
 * Maneja el evento de clic en el botón 2. Si el área de entrada no está vacía, llama a la función de desencriptación.
 */
button2.addEventListener("click", () => {
    if (textAreaInput.value !== "") {
        decrypt();
    }
});

/**
 * Maneja el evento de clic en el botón 3. Selecciona el contenido del área de salida y copia al portapapeles.
 */
button3.addEventListener('click', () => {
    textAreaOutput.select();
    document.execCommand('copy');
});

/**
 * Comprueba si el área de entrada está vacía al presionar una tecla. Si está vacía, llama a la función showDefault().
 */
textAreaInput.addEventListener("keyup", function () {
    if (textAreaInput.value.length === 0) {
        showDefaultOutput();
    }
});





