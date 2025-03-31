document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

const texto = [
    "¡Vamos con los operadores matemáticos en Python!",
    "Puedes usar + para sumar, - para restar, * para multiplicar y / para dividir.",
    "También puedes usar // para división entera, % para obtener el residuo y ** para potencias.",
    "Ejemplo: resultado = 10 + 5  → resultado tendrá 15",
    "¡Ahora crea operaciones con tus datos Pokémon y muestra el resultado!",
    "Tu misión:\nSuma edades, calcula promedio de velocidad y multiplica niveles."
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
    const codigo = document.getElementById("codigoUsuario").value;
    const resultado = document.getElementById("resultado");

    const sumaEdades = /edad_total\s*=\s*edad1\s*\+\s*edad2/.test(codigo);
    const promedio = /promedio_velocidad\s*=\s*\(?\s*vel1\s*\+\s*vel2\s*\)?\s*\/\s*2/.test(codigo);
    const multiplicacion = /poder\s*=\s*nivel1\s*\*\s*nivel2/.test(codigo);
    const usaPrint = /print\s*\(.+\)/i.test(codigo);

    if (sumaEdades && promedio && multiplicacion && usaPrint) {
        resultado.style.color = "green";
        resultado.textContent = "✅ ¡Muy bien! Has usado correctamente los operadores matemáticos.";
        document.getElementById("btnVolverMapa").style.display = "block";
    } else {
        resultado.style.color = "red";
        resultado.textContent = "❌ Revisa tus operaciones: suma, promedio y multiplicación. Usa también print().";
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
            nivel: 4
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
