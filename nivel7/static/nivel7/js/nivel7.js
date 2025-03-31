document.getElementById("instructora").addEventListener("click", function () {
    condiciones.style.display = "none";
    var globo = document.getElementById("globoDialogo");
    globo.style.display = "block";  // Muestra el globo de diálogo
    mostrarTexto();
});

// Función para mostrar el texto poco a poco en párrafos
function mostrarTexto() {
    var texto = [
        "¡Ahora vamos a recorrer datos! Con un for, puedes revisar cada ataque de tu Pokémon, uno por uno." ,
        " ¡Es como pasar lista de movimientos antes de entrar al combate!",


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
            setTimeout(escribirTexto, 5);  // Esperar 4 segundos antes de escribir el siguiente
        } else {
            // Si es el último párrafo, agregar un evento de clic para cerrar el globo
            textoElement.innerHTML += "<p>Haz clic en cualquier parte para continuar...</p>";
            // Agregar evento para cerrar el globo
            document.body.addEventListener("click", function cerrarGlobo() {
                document.getElementById("globoDialogo").style.display = "none";
                 // Mostrar el div de comparación cuando termine el texto
                document.getElementById("condiciones").style.display = "block";
                document.body.removeEventListener("click", cerrarGlobo); // Remueve el listener para evitar clics posteriores
            });
        }
    }

    escribirTexto();  // Comienza a escribir el texto
}


function irPrueba(){
    document.getElementById("condiciones").style.display = "none";
    document.getElementById("prueba").style.display = "block";
}
function revisarRespuestas() {
    const preguntas = ["f1", "f2", "f3", "f4", "f5"];
    let todasContestadas = true;

    // Verificar si todas las preguntas están respondidas
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
        return;
    }

    // Respuestas correctas esperadas
    const respuestasCorrectas = {
        f1: "for nombre in pokemones:",
        f2: "Recorre la lista usando índices",
        f3: "Pikachu, Charmander, Bulbasaur",
        f4: "for i in range(3):",
        f5: "Muestra índice y nombre correctamente"
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

    const resultado = document.getElementById("resultado-for");
    if (puntuacion === preguntas.length) {
        resultado.innerHTML = ` ¡Dominaste el ciclo for! Puntaje: ${puntuacion}/${preguntas.length}`;
    } else if (puntuacion >= preguntas.length * 0.6) {
        resultado.innerHTML = ` Buen intento. Aciertos: ${puntuacion}/${preguntas.length}`;
    } else {
        resultado.innerHTML = ` Necesitas practicar más los ciclos. Aciertos: ${puntuacion}/${preguntas.length}`;
    }
}