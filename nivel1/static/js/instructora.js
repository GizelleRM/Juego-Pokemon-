document.getElementById("instructora").addEventListener("click", function() {
    var globo = document.getElementById("globoDialogo");
    globo.style.display = "block";  // Muestra el globo de diálogo
    mostrarTexto();
});

// Función para mostrar el texto poco a poco en párrafos
function mostrarTexto() {
    var texto = [
        "¡Hola! Soy tu instructora. Hoy en nustra primera lección aprenderemos ¿Qué es python?.",
        "Python es un lenguaje de programación, o sea, un idioma que las computadoras entienden para hacer cosas chidas.",
        "¿Qué puedes hacer con python?",
        "Puedes crear juegos como laberintos o personajes, matemáticas para poder resolver operaciones más rápido que en tu calculadora.",
        "Puedes hacer dibujos, robots como programar cochecitos o barzos robóticos.",
        "Algunas reglas de python son:",
        "1. Las ordenes se escriben una por una, o sea, Python lee tus instrucciones de arriba hacia abajo, línea por linea.",
        "2. El lenguaje es delicado con las mayúsculas en las instrucciones, por ejemplo print() es correcto, pero Print() es incorrecto.",
        "3. En python hay palabras especiales que usa el lenguaje usa y no podemos usar para nostros como (if, while, def, for, import, elif, etc.).",
        "Ahora para terminar esté nivel haremos un pequeño cuestionario."
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
            document.body.addEventListener("click", function cerrarGlobo() {
                document.getElementById("globoDialogo").style.display = "none";
                document.body.removeEventListener("click", cerrarGlobo);  // Remueve el listener para evitar clics posteriores

                  // Redirigir al cuestionario
                window.location.href = "cuestionario";
            });
        }
    }

    escribirTexto();  // Comienza a escribir el texto
}
