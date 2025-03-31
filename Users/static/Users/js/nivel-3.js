document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

const texto = [
    "¡Muy bien! Ahora vamos a explorar estructuras más avanzadas en Python.",
    "Primero, algo importante:\nEn Python puedes escribir COMENTARIOS usando el símbolo #",
    "Todo lo que escribas después del símbolo # no se ejecuta.\nSirve para dejar notas o explicaciones dentro del código.",
    "Ejemplo:\n# Esto es un comentario\nmochila = [\"Pokeball\", \"Poción\"]",
    "Las listas (`list`) permiten guardar varios elementos en orden. Ejemplo:\nmochila = [\"Pokeball\", \"Poción\"]",
    "Los diccionarios (`dict`) almacenan datos usando claves. Ejemplo:\npokemon = {\"nombre\": \"Bulbasaur\", \"tipo\": \"planta\"}",
    "Puedes acceder a los datos así:\nmochila[0] → Pokeball\npokemon[\"tipo\"] → planta",
    "¡Hora de organizar tu mochila y tu Pokédex!",
    "Tu misión:\nCrea una lista llamada mochila con al menos dos objetos.\nLuego, crea un diccionario llamado pokemon con las claves \"nombre\" y \"tipo\")."

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
        void textoElement.offsetWidth;
        textoElement.textContent = texto[i];
        textoElement.classList.add("texto-animado");
        i++;
        intervalo = setTimeout(escribirTexto, 8000);
    } else {
        textoElement.innerHTML += "\n\n¡Ahora escribe tu código abajo!";
    }
}

function evaluarCodigo() {
    let codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    // 🔍 Eliminar espacios innecesarios y unificar en una sola línea para facilitar las expresiones regulares
    const limpio = codigo.replace(/\s+/g, ' ').trim();

    // Lista con al menos un string
    const tieneLista = /mochila\s*=\s*\[\s*["'][^"']+["'](,\s*["'][^"']+["'])*\s*\]/.test(limpio);
    // Diccionario (aceptando nombre y tipo en cualquier orden)
    const dictNombreTipo = /pokemon\s*=\s*\{[^}]*["']nombre["']\s*:\s*["'][^"']+["'][^}]*["']tipo["']\s*:\s*["'][^"']+["'][^}]*\}/.test(limpio);
    const tieneDict = dictNombreTipo || dictTipoNombre;

    if (tieneLista && tieneDict) {
        alert("✅ ¡Excelente! Has organizado tu mochila y Pokédex correctamente.");
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        alert("❌ Aún falta completar o corregir algo. Revisa listas, diccionarios y prints.");
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
