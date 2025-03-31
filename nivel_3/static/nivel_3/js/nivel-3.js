// Espera a que el documento esté completamente cargado para ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene la instructora y le asigna un evento de clic para iniciar el diálogo
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

// Array que contiene las líneas del diálogo de la instructora
const texto = [
    "¡Muy bien! Ahora vamos con estructuras más avanzadas.",
    "Antes de empezar, te cuento algo importante:\nEn Python puedes escribir COMENTARIOS con el símbolo #",
    "Lo que escribas después de ese símbolo no afecta al código,\nes solo una nota para ayudarte a entenderlo.",
    "Ejemplo:\n# Esto es un comentario\nmochila = [\"Pokeball\", \"Poción\"]",
    "Las listas (`list`) guardan elementos en orden. Ejemplo:\nmochila = [\"Pokeball\", \"Poción\"]",
    "Los diccionarios (`dict`) guardan datos con claves. Ejemplo:\npokemon = {\"nombre\": \"Bulbasaur\", \"tipo\": \"planta\"}",
    "Puedes acceder así:\nmochila[0] → Pokeball\npokemon[\"tipo\"] → planta",
    "¡Vamos a organizar tu mochila y tu Pokédex!",
    "Tu misión:\nCrea una lista con objetos, un diccionario para tu Pokémon,\nañade un nuevo dato y muestra su tipo."
];

// Variables para controlar el índice del texto y el intervalo de animación
let i = 0;
let intervalo;

// Inicia el diálogo desde el principio
function iniciarDialogo() {
    i = 0;
    clearTimeout(intervalo); // Detiene cualquier diálogo anterior en progreso

    const globo = document.getElementById("globoDialogo");
    const textoElement = document.getElementById("instructorTexto");
    const instructoraImg = document.querySelector(".imagen-sobre-video2");

    // Muestra el globo de diálogo
    globo.style.display = "block";
    textoElement.innerHTML = "";
    textoElement.classList.remove("texto-animado");

    // Aplica animación a la instructora
    instructoraImg.classList.add("animar-instructora");
    setTimeout(() => {
        instructoraImg.classList.remove("animar-instructora");
    }, 500);

    // Comienza a escribir el texto
    escribirTexto();
}

// Función que escribe línea por línea el texto con animación
function escribirTexto() {
    const textoElement = document.getElementById("instructorTexto");

    if (i < texto.length) {
        textoElement.classList.remove("texto-animado");
        void textoElement.offsetWidth; // Reinicia la animación
        textoElement.textContent = texto[i];
        textoElement.classList.add("texto-animado");
        i++;
        intervalo = setTimeout(escribirTexto, 8000); // Tiempo entre cada mensaje
    } else {
        // Agrega mensaje final al terminar el diálogo
        textoElement.innerHTML += "\n\n¡Ahora escribe tu código abajo!";
    }
}

// Evalúa el código ingresado por el usuario en el textarea
function evaluarCodigo() {
    let codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    // Limpia el código eliminando espacios innecesarios para facilitar la evaluación
    const limpio = codigo.replace(/\s+/g, ' ').trim();

    // Verifica si el usuario creó una lista con al menos un string
    const tieneLista = /mochila\s*=\s*\[\s*["'][^"']+["'](,\s*["'][^"']+["'])*\s*\]/.test(limpio);

    // Verifica si el usuario creó un diccionario con las claves 'nombre' y 'tipo'
    const dictNombreTipo = /pokemon\s*=\s*\{[^}]*["']nombre["']\s*:\s*["'][^"']+["']\s*,\s*["']tipo["']\s*:\s*["'][^"']+["']\s*\}/.test(limpio);
    const dictTipoNombre = /pokemon\s*=\s*\{[^}]*["']tipo["']\s*:\s*["'][^"']+["']\s*,\s*["']nombre["']\s*:\s*["'][^"']+["']\s*\}/.test(limpio);
    const tieneDict = dictNombreTipo || dictTipoNombre;

    // Si ambos están correctos, muestra mensaje de éxito
    if (tieneLista && tieneDict) {
        resultado.style.color = "green";
        resultado.textContent = "¡Excelente! Has organizado tu mochila y Pokédex correctamente.";
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        // Si falta algo, muestra mensaje de error
        resultado.style.color = "red";
        resultado.textContent = "Aún falta completar o corregir algo. Revisa listas, diccionarios y prints.";
    }
}

// Envía el progreso al servidor y redirige al mapa
function guardarYVolverAlMapa() {
    fetch('/usuarios/actualizar-nivel/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            nickName: nickName,
            nivel: 3
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Nivel actualizado:", data);
        window.location.href = "/mapa/" + nickName + "/";
    })
    .catch(error => {
        console.error("Error al actualizar nivel:", error);
        window.location.href = "/mapa/" + nickName + "/";
    });
}

// Función para obtener el token CSRF de las cookies
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
