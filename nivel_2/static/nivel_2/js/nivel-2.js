// Espera a que el DOM esté cargado para agregar el evento de clic a la instructora
document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

// Arreglo con los textos que se mostrarán en el globo de diálogo
const texto = [
    "¡Hola, joven entrenador! Antes de salir al mundo Pokémon, necesitas dominar el maravilloso mundo de la programación.",
    "Hoy aprenderemos tres tipos de datos muy útiles:",
    'int → Números enteros, como la edad de tu Pokémon:\nedad = 5',
    'float → Números con decimales, como su velocidad:\nvelocidad = 3.5',
    'str → Cadenas de texto, como su nombre:\nnombre = "Pikachu"',
    '¿Y cómo vemos lo que guardamos?\n¡Usamos print()!',
    'print() es una orden mágica que muestra algo en pantalla.\nprint("¡Charmander, yo te elijo!")\nMostrará: ¡Charmander, yo te elijo!"',
    'Existen las llamadas palabras reservadas como print, if, else, while, True, False...',
    'Con ellas no puedes hacer esto:\nprint = "Bulbasaur"  # Esto causará error',
    'Tu misión:\nCrea las variables de tu Pokémon y muestra su ficha.'
];

// Variables para controlar el índice del texto y el intervalo de animación
let i = 0;
let intervalo;

// Función que inicia el diálogo
function iniciarDialogo() {
    i = 0; // Reinicia el índice del texto
    clearTimeout(intervalo); // Detiene cualquier intervalo anterior

    const globo = document.getElementById("globoDialogo");
    const textoElement = document.getElementById("instructorTexto");
    const instructoraImg = document.querySelector(".imagen-sobre-video2");

    // Muestra el globo de diálogo y limpia el contenido anterior
    globo.style.display = "block";
    textoElement.innerHTML = "";
    textoElement.classList.remove("texto-animado");

    // Agrega la animación de la instructora al hacer clic
    instructoraImg.classList.add("animar-instructora");
    setTimeout(() => {
        instructoraImg.classList.remove("animar-instructora");
    }, 500);

    escribirTexto(); // Comienza a escribir el texto
}

// Función que muestra el texto del diálogo uno por uno
function escribirTexto() {
    const textoElement = document.getElementById("instructorTexto");

    if (i < texto.length) {
        // Reinicia la animación de texto
        textoElement.classList.remove("texto-animado");
        void textoElement.offsetWidth;
        textoElement.textContent = texto[i];
        textoElement.classList.add("texto-animado");

        i++;
        intervalo = setTimeout(escribirTexto, 8000); // Espera 8 segundos entre frases
    } else {
        textoElement.innerHTML += "\n\n¡Ahora escribe tu código abajo!";
    }
}

// Función que evalúa si el código ingresado por el usuario cumple los requisitos
function evaluarCodigo() {
    const codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    // Expresiones regulares para validar el contenido del código
    const tieneNombre = /nombre\s*=\s*["'][\w\s]+["']/i.test(codigo);
    const tieneEdad = /edad\s*=\s*\d+/i.test(codigo);
    const tieneVelocidad = /velocidad\s*=\s*\d+(\.\d+)?/i.test(codigo);
    const usaPrint = /print\s*\(.+\)/i.test(codigo);

    // Si el código cumple todas las condiciones
    if (tieneNombre && tieneEdad && tieneVelocidad && usaPrint) {
        alert("✅ ¡Excelente! Has creado y actualizado la ficha de tu Pokémon correctamente.");
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        alert("❌ Aún falta completar o corregir algo. Habla con la instructora para repasar.");
    }
}

// Función que guarda el progreso del nivel y redirige al mapa
function guardarYVolverAlMapa() {
    fetch('/usuarios/actualizar-nivel/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            nickName: nickName,
            nivel: 2 // Nivel actual que se está reportando como completado
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
