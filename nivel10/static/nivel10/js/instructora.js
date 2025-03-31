alert("JS del nivel 10 cargado");

document.getElementById("instructora").addEventListener("click", function() {
    var globo = document.getElementById("globoDialogo");
    globo.style.display = "block";  // Muestra el globo de diálogo
    mostrarTexto();
});

// Función para mostrar el texto poco a poco en párrafos
function mostrarTexto() {
    var texto = [
        "¡Hola! Soy tu instructora. Estas a punto de concluir este curso de programación basico en python 💪.",
        "Para concluir, haremos un ultimo cuestionario para poner a prueba tus habilidades.",
        "Suerte!!!!!!!!"
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
                
                window.location.href = `cuestionario/10/`;   
            });
        }
    }

    escribirTexto();  // Comienza a escribir el texto
}
