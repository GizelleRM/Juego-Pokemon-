document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

const texto = [
    `¿Qué es una función?

    Una función es como una máquina: le das una orden, hace el trabajo, y te da un resultado.
    
    En Python, las funciones te permiten reutilizar código y organizarlo mejor.`,

    `Por ejemplo:

    def saludar():
        print("¡Hola!")

    saludar()  # Llama a la función`,

    `Ahora... Chorizas necesita aprender dos acciones básicas: saltar y agachar.

    Tu misión:
    - Crea una función llamada saltar() que imprima "saltar"
    - Crea otra llamada agachar() que imprima "agachar"
    - ¡Haz clic en Evaluar Código cuando termines!`
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
    }, 15000);

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
        intervalo = setTimeout(escribirTexto, 15000);
    } else {
        textoElement.innerHTML += "\n\n¡Ahora completa el código abajo!";
    }
}

function evaluarCodigo() {
    let codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");
    const limpio = codigo.replace(/\s+/g, ' ').trim();

    const tieneSaltar = /def\s+saltar\s*\(\s*\)\s*:\s*print\s*\(\s*["']saltar["']\s*\)/i.test(limpio);
    const tieneAgachar = /def\s+agachar\s*\(\s*\)\s*:\s*print\s*\(\s*["']agachar["']\s*\)/i.test(limpio);

    if (tieneSaltar && tieneAgachar) {
        alert("🎉 ¡Buen trabajo! Chorizas ya sabe saltar y agacharse.");
    } else {
        alert("❌ Revisa que tus funciones se llamen saltar() y agachar() y que impriman lo correcto.");
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
            nivel: 5
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
