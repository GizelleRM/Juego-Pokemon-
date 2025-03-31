document.addEventListener("DOMContentLoaded", function () {
    const instructora = document.querySelector(".instructora-imagen");
    instructora.addEventListener("click", iniciarDialogo);
});

const texto = [
    `¿Qué es un ciclo while?
    
    Un ciclo while repite una tarea una y otra vez, pero solo si se cumple una condición.
    Cuando esa condición ya no se cumple, el ciclo se detiene.
    
    Es como preguntarte: "¿Todavía hay galletas en la caja?" 
    
    Si la respuesta es SÍ:
      - Tomas una galleta
      - Vuelves a preguntar
    
    Si la respuesta es NO:
      - El ciclo termina`,
    
    `Ejemplo en Python: 
    
    galletas_en_la_caja = 3  # Empiezas con 3 galletas
    
    while galletas_en_la_caja > 0:
        print("¡Me comí una galleta! ")
        galletas_en_la_caja = galletas_en_la_caja - 1
    
    print("¡Se acabaron las galletas! ")`,
    
    `Ahora... Hash necesita cargar su Pokévisor para detectar a Bulbasaur.
    
    Cada ciclo aumentará su batería en un 20%.
    
    Tu misión:
    - Usa un while para aumentar la batería
    - Muestra el porcentaje de carga en cada paso
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

    const tieneWhile = /while\s+carga\s*<\s*100\s*:/i.test(limpio);
    const tienePrint = /print\s*\(\s*["']Cargando\.\.\.["']\s*,\s*carga\s*\)/i.test(limpio);
    const sumaCorrecta = /carga\s*=\s*carga\s*\+\s*20/.test(limpio) || /carga\s*\+=\s*20/.test(limpio);

    if (tieneWhile && tienePrint && sumaCorrecta) {
        alert("🎉 ¡INCREÍBLE! ¡Hash cargó el Pokévisor al 100%! Continua con el siguiente nivel");
    } else {
        alert("❌ Revisa tu ciclo while, tu print y que estés sumando correctamente.");
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
