// Obtenemos los elementos del DOM
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const textAreaInput = document.querySelector(".textareainput");
const textAreaOutput = document.querySelector(".textareaoutput");

/*Cada vez que alguien cargue la pagina, el cursor estará
listo para empezar a escribir */
document.querySelector("textarea").focus();
document.querySelector("textarea").select();


//Función para que en el text area solo puedas ingresar caracteres permitidos.
function lowerCase() {
    textAreaInput.value = textAreaInput.value.toLowerCase();
    textAreaInput.value = textAreaInput.value.replace(/[^a-z ]/g, "")
}

//Funcion para mostrar el apartado del outputarea por default
function showDefault() {

    document.getElementById("aluracharacter").style.display = "block"; //Mostramos la imagen de busqueda de alura
    document.querySelector('.outputarea .notice').style.display = 'flex'; //Mostramos el div.notice

    document.querySelector(".textareaoutput").style.display = "none"; //Devolvemos al estado inicial el output
    document.querySelector(".button").style.display = "none"; //Ocultamos botón


    // document.getElementById("aluracharacter").style.display = "initial"; //Mostramos la imagen de busqueda 

}

//Función para esconder divs y mostrar resultados
function showResult() {
    document.getElementById("aluracharacter").style.display = "none"; //Ocultamos la imagen.
    document.querySelector('.outputarea .notice').style.display = "none"; //ocultamos el div.notice 

    document.querySelector(".textareaoutput").style.display = "block"; //Mostramos el area del textareaoutput
    document.querySelector(".button").style.display = "block";          //Mostramos el botón de copiar.
    document.querySelector(".textareaoutput").value = textAreaOutput.value; //Mostramos el mensaje

}

//Función para encriptar
function encrypt() {
    let text = textAreaInput.value.trim(); //Eliminamos los espacios
    text = text.replaceAll("e", "enter");
    text = text.replaceAll("i", "imes");
    text = text.replaceAll("a", "ai");
    text = text.replaceAll("o", "ober");
    text = text.replaceAll("u", "ufat");
    textAreaOutput.value = text;

    showResult();             //Llamamos la fonción para mostrar el resultado
}

//Función para desenencriptar
function decrypt() {
    let text = textAreaInput.value.trim();
    text = text.replaceAll("enter", "e");
    text = text.replaceAll("imes", "i");
    text = text.replaceAll("ai", "a");
    text = text.replaceAll("ober", "o");
    text = text.replaceAll("ufat", "u");
    textAreaOutput.value = text;

    showResult();             //Llamamos la fonción para mostrar el resultado
}



button1.addEventListener("click", () => {
    if (textAreaInput.value !== "") {             //Verificamos que el textarea no esté vacío
        encrypt();                               //Llamamos la función para encriptar
    }
});


button2.addEventListener("click", () => {
    if (textAreaInput.value !== "") {             //Verificamos que el textarea no esté vacío
        decrypt();                               //Llamamos la función para encriptar
    }
});

button3.addEventListener('click', () => {
    textAreaOutput.select();
    document.execCommand('copy')
})


//Comprobar con el textareainput si hay alguna letra.
textAreaInput.addEventListener("keyup", function () {
    if (textAreaInput.value.length === 0) {
        showDefault(); //Llamo a la función showDefault
    }
})




