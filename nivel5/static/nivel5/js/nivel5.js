const nickname = document.body.dataset.nickname;

document.getElementById("instructora").addEventListener("click", function () {
    comparacion.style.display = "none";
    var globo = document.getElementById("globoDialogo");
    globo.style.display = "block";  // Muestra el globo de diálogo
    mostrarTexto();
});

// Función para mostrar el texto poco a poco en párrafos
function mostrarTexto() {
    var texto = [
        "¡Entrenador! Para tomar decisiones inteligentes en batalla, debes aprender a comparar los valores de tus Pokémon. Los operadores lógicos te ayudan a saber si un Pokémon está débil, si tiene ventaja de tipo... ¡o si necesita ayuda urgente!",
        "Por ejemplo: si Squirtle tiene menos de 40 HP y es tipo agua, ¡dale una poción!",
        "Primero veamos los operadores de comparación",

    ];

    var i = 0;  // Controlador del texto
    var textoElement = document.getElementById("instructorTexto");

    function escribirTexto() {
        if (i < texto.length) {
            textoElement.innerHTML = "";  // Limpiar el texto anterior
            var parrafo = document.createElement("p");
            parrafo.innerText = texto[i];  // Escribir el siguiente párrafo
            textoElement.appendChild(parrafo);  // Añadir el párrafo al globo
            i++;
            setTimeout(escribirTexto, 5500);  // Esperar 4 segundos antes de escribir el siguiente
        } else {
            // Si es el último párrafo, agregar un evento de clic para cerrar el globo
            textoElement.innerHTML += "<p>Haz clic en cualquier parte para continuar...</p>";
            // Agregar evento para cerrar el globo
            document.body.addEventListener("click", function cerrarGlobo() {
                document.getElementById("globoDialogo").style.display = "none";
                // Mostrar el div de comparación cuando termine el texto
                document.getElementById("comparacion").style.display = "block";
                document.body.removeEventListener("click", cerrarGlobo); // Remueve el listener para evitar clics posteriores
            });
        }
    }

    escribirTexto();  // Comienza a escribir el texto
}

function irASiguiente() {
    document.getElementById("comparacion").style.display = "none";
    document.getElementById("logicos").style.display = "block";

}
function irPrueba() {
    document.getElementById("logicos").style.display = "none";
    document.getElementById("prueba").style.display = "block";
}
function revisarRespuestas() {
    const preguntas = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
    let todasContestadas = true;

    // Verificar si todas las preguntas tienen una opción seleccionada
    for (let i = 0; i < preguntas.length; i++) {
        const opciones = document.getElementsByName(preguntas[i]);
        let algunaSeleccionada = false;
        for (let j = 0; j < opciones.length; j++) {
            if (opciones[j].checked) {
                algunaSeleccionada = true;
                break;
            }
        }
        if (!algunaSeleccionada) {
            todasContestadas = false;
            break;
        }
    }

    if (!todasContestadas) {
        alert("Debes responder todas las preguntas antes de revisar.");
        return; // Salir si falta alguna
    }

    // Si todo está contestado, evaluar respuestas (como antes)
    const respuestasCorrectas = {
        p1: ">",
        p2: "and",
        p3: "!=",
        p4: "or",
        p5: "!=",
        p6: "and",
        p7: "<="
    };

    let puntuacion = 0;
    for (let pregunta in respuestasCorrectas) {
        const opciones = document.getElementsByName(pregunta);
        for (let opcion of opciones) {
            if (opcion.checked && opcion.parentElement.textContent.trim() === respuestasCorrectas[pregunta]) {
                puntuacion++;
            }
        }
    }

    const resultado = document.getElementById("resultado-prueba");
    if (puntuacion === preguntas.length) {
        resultado.innerHTML = `¡Perfecto, entrenador! Respondiste todo correctamente. Puntaje: ${puntuacion}/${preguntas.length}`;
        actualizarNivel(nickname, 5);

    } else if (puntuacion >= preguntas.length * 0.6) {
        resultado.innerHTML = `¡Buen trabajo! Aciertos: ${puntuacion}/${preguntas.length}. ¡Sigue entrenando!`;
    } else {
        resultado.innerHTML = `Necesitas más entrenamiento Pokémon... Aciertos: ${puntuacion}/${preguntas.length}`;
    }
}
function actualizarNivel(nickName, nivel) {
    fetch('/usuarios/actualizar-nivel/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            nickName: nickName,
            nivel: nivel
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
