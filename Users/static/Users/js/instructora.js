document.getElementById("instructora").addEventListener("click", function() {
    var globo = document.getElementById("globoDialogo");
    globo.style.display = "block";  // Muestra el globo de diálogo
    mostrarTexto();
});

// Función para mostrar el texto poco a poco en párrafos
function mostrarTexto() {
    var texto = [
        "¡Hola! Soy tu instructora. Estoy aquí para guiarte en tu camino para convertirte en un experto en programación.",
        "A lo largo de este juego, irás resolviendo desafíos que te enseñarán conceptos clave de programación.",
        "Mi misión es ayudarte a entender lo que estás aprendiendo y darte consejos para que puedas superar cada nivel.",
        "No te preocupes si al principio algo te parece difícil. Con cada paso, irás mejorando y avanzando.",
        "Recuerda que los errores son una parte natural del aprendizaje. ¡No te rindas y sigue adelante!",
        "Estoy aquí para ayudarte, así que cada vez que necesites un consejo, ¡estoy a un clic de distancia!",
        "¡Vamos! Haz clic en cualquier parte para continuar y enfrentarte a nuevos desafíos de programación. ¡Tú puedes hacerlo!"
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
            textoElement.innerHTML += "<br><br><p>Haz clic en cualquier parte para continuar...</p>";
            document.body.addEventListener("click", function cerrarGlobo() {
                document.getElementById("globoDialogo").style.display = "none";
                document.body.removeEventListener("click", cerrarGlobo);  // Remueve el listener para evitar clics posteriores
            });
        }
    }

    escribirTexto();  // Comienza a escribir el texto
}
