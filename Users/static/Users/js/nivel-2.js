// Mostrar globo y comenzar texto al hacer clic en la instructora
document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

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

let i = 0;
let intervalo;

function iniciarDialogo() {
    i = 0;
    clearTimeout(intervalo);

    const globo = document.getElementById("globoDialogo");
    const textoElement = document.getElementById("instructorTexto");
    const instructoraImg = document.querySelector(".imagen-sobre-video2");

    globo.style.display = "block";
    textoElement.innerHTML = "";
    textoElement.classList.remove("texto-animado");

    // Reiniciar animación de la instructora (saltito)
    instructoraImg.classList.add("animar-instructora");
    setTimeout(() => {
        instructoraImg.classList.remove("animar-instructora");
    }, 500);

    escribirTexto();
}

function escribirTexto() {
    const textoElement = document.getElementById("instructorTexto");

    if (i < texto.length) {
        textoElement.classList.remove("texto-animado");
        void textoElement.offsetWidth; // Reinicio forzado de animación
        textoElement.textContent = texto[i];
        textoElement.classList.add("texto-animado");

        i++;
        intervalo = setTimeout(escribirTexto, 8000);
    } else {
        textoElement.innerHTML += "\n\n¡Ahora escribe tu código abajo!";
    }
}

// Evaluar código del usuario
function evaluarCodigo() {
    const codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    const tieneNombre = /nombre\s*=\s*["'][\w\s]+["']/i.test(codigo);
    const tieneEdad = /edad\s*=\s*\d+/i.test(codigo);
    const tieneVelocidad = /velocidad\s*=\s*\d+(\.\d+)?/i.test(codigo);
    const usaPrint = /print\s*\(.+\)/i.test(codigo);
    if (tieneNombre && tieneEdad && tieneVelocidad && usaPrint) {
        alert("✅ ¡Excelente! Has creado y actualizado la ficha de tu Pokémon correctamente.");
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        alert("❌ Aún falta completar o corregir algo. Habla con la instructora para repasar.");
    }
}

function guardarYVolverAlMapa() {
    fetch('/usuarios/actualizar-nivel/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            nickName: nickName,
            nivel: 2  // ← Cambia el número según el nivel actual
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
