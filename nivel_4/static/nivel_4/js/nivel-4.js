// Cuando el DOM esté completamente cargado, se agrega un evento de clic a la instructora
document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

// Array con los textos que se mostrarán en el globo de diálogo
const texto = [
    "¡Vamos con los operadores matemáticos en Python!",
    "Puedes usar + para sumar, - para restar, * para multiplicar y / para dividir.",
    "También puedes usar // para división entera, % para obtener el residuo y ** para potencias.",
    "Ejemplo: resultado = 10 + 5  → resultado tendrá 15",
    "¡Ahora crea operaciones con tus datos Pokémon y muestra el resultado!",
    "Tu misión:\nSuma edades, calcula promedio de velocidad y multiplica niveles."
];

let i = 0; // Índice actual del mensaje
let intervalo; // Variable para controlar el tiempo entre mensajes

// Función que inicia el diálogo y la animación de la instructora
function iniciarDialogo() {
    i = 0; // Reinicia el índice de mensajes
    clearTimeout(intervalo); // Detiene cualquier temporizador anterior

    const globo = document.getElementById("globoDialogo");
    const textoElement = document.getElementById("instructorTexto");
    const instructoraImg = document.querySelector(".imagen-sobre-video2");

    globo.style.display = "block";
    textoElement.innerHTML = "";
    textoElement.classList.remove("texto-animado");

    // Se aplica animación a la instructora al hacer clic
    instructoraImg.classList.add("animar-instructora");
    setTimeout(() => {
        instructoraImg.classList.remove("animar-instructora");
    }, 500);

    escribirTexto(); // Comienza el texto
}

// Función para mostrar los textos uno a uno con animación
function escribirTexto() {
    const textoElement = document.getElementById("instructorTexto");

    if (i < texto.length) {
        textoElement.classList.remove("texto-animado");
        void textoElement.offsetWidth; // Reinicio forzado de animación
        textoElement.textContent = texto[i]; // Muestra el texto actual
        textoElement.classList.add("texto-animado");
        i++;
        intervalo = setTimeout(escribirTexto, 8000); // Espera 8 segundos antes del siguiente
    } else {
        // Al terminar todos los textos, muestra una instrucción adicional
        textoElement.innerHTML += "\n\n¡Ahora escribe tu código abajo!";
    }
}

// Función que evalúa si el código ingresado por el usuario es correcto
function evaluarCodigo() {
    const codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    // Expresiones regulares para comprobar el uso correcto de operadores
    const sumaEdades = /edad_total\s*=\s*edad1\s*\+\s*edad2/.test(codigo);
    const promedio = /promedio_velocidad\s*=\s*\(?\s*vel1\s*\+\s*vel2\s*\)?\s*\/\s*2/.test(codigo);
    const multiplicacion = /poder\s*=\s*nivel1\s*\*\s*nivel2/.test(codigo);
    const usaPrint = /print\s*\(.+\)/i.test(codigo);

    // Si todas las expresiones se cumplen, muestra mensaje positivo
    if (sumaEdades && promedio && multiplicacion && usaPrint) {
        resultado.style.color = "green";
        resultado.textContent = "Muy bien. Has usado correctamente los operadores matemáticos.";
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        // Si alguna expresión no se cumple, muestra mensaje de error
        resultado.style.color = "red";
        resultado.textContent = "Revisa tus operaciones: suma, promedio y multiplicación. Usa también print().";
    }
}

// Función que guarda el progreso del usuario y lo regresa al mapa
function guardarYVolverAlMapa() {
    fetch('/usuarios/actualizar-nivel/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            nickName: nickName, // Variable global que debe estar definida en el HTML
            nivel: 4 // Nivel actual que se está evaluando
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Nivel actualizado:", data);
        window.location.href = "/mapa/" + nickName + "/"; // Redirige al mapa
    })
    .catch(error => {
        console.error("Error al actualizar nivel:", error);
        window.location.href = "/mapa/" + nickName + "/";
    });
}

// Función que obtiene el token CSRF necesario para la petición POST
function getCSRFToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        const trimmed = c.trim();
        if (trimmed.startsWith(name + '=')) {
            return decodeURIComponent(trimmed.slice(name.length + 1));
        }
    }
    return '';
}
