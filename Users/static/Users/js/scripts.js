// Variables globales para almacenar la información del usuario
let nombreUsuario = "";
let nickName = "";
let avatarSeleccionado = 1;
let pokemonSeleccionado = 2;


document.addEventListener("DOMContentLoaded", function () {
    console.log("Página cargada. Iniciando temporizador de 10 segundos...");

    setTimeout(function() {
        let boton = document.getElementById('botonPlay');
        if (boton) {
            console.log("Mostrando el botón.");
            boton.style.display = 'block';
        } else {
            console.error("El botón no fue encontrado en el DOM.");
        }
    }, 3500); // 10 segundos

    // Agregar evento de clic al botón PLAY
    document.getElementById('botonPlay').addEventListener('click', function() {
        console.log("Botón PLAY presionado.");

        // Agregar una clase que oscurezca la pantalla
        let contenedor = document.querySelector('.contenedor-video');
        contenedor.classList.add('fade-out');

        // Esperar 1.5 segundos antes de cambiar el fondo y mostrar el formulario
        setTimeout(() => {
            // Ocultar el video y las imágenes
            document.querySelector('.video-ajustado').style.display = 'none';
            document.querySelector('.texto-sobre-video').style.display = 'none';
            document.getElementById('botonPlay').style.display = 'none';

            let imagenes = document.querySelectorAll('.imagen-sobre-video, .imagen-sobre-video2, .imagen-sobre-video3, .imagen-sobre-video4');
            imagenes.forEach(img => img.style.display = 'none');

            // Cambiar el fondo del contenedor-video
            contenedor.style.backgroundImage = "url('/static/Users/images/fondos/fondoInicio2.jpg')";
            
            // Mostrar el formulario
            document.querySelector('.login-container').classList.add('show');

            // Restaurar la opacidad lentamente
            contenedor.classList.remove('fade-out');
            contenedor.classList.add('fade-in');
        }, 1500); // 1.5 segundos de oscuridad
    });

    document.getElementById('showRegister').addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Botón registrar presionado.");
    
        // Agregar una clase que oscurezca la pantalla
        let contenedor = document.querySelector('.contenedor-video');
        contenedor.classList.add('fade-out');
    
        // Esperar 1.5 segundos antes de ocultar el login y mostrar el registro
        setTimeout(() => {
            // Ocultar el formulario de login
            document.querySelector('.login-container').classList.add('hidden');
    
             // Asegurar que el formulario de registro se muestre
        let registerForm = document.querySelector('.register-container');
        registerForm.classList.remove('hidden');  // Quita la clase que lo oculta
        registerForm.style.display = 'block';  // Asegura que sea visible

        console.log("Formulario de registro mostrado.");
    
            // Restaurar la opacidad lentamente
            contenedor.classList.remove('fade-out');
            contenedor.classList.add('fade-in');
        }, 1000); // 1.5 segundos de transición
    });
    
    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Botón regresar presionado.");
    
        // Agregar una clase que oscurezca la pantalla
        let contenedor = document.querySelector('.contenedor-video');
        contenedor.classList.add('fade-out');
    
        // Esperar 1.5 segundos antes de ocultar el login y mostrar el registro
        setTimeout(() => {
            // Ocultar el formulario de login
            document.querySelector('.register-container').classList.add('hidden');
    
             // Asegurar que el formulario de registro se muestre
        let registerForm = document.querySelector('.login-container');
        registerForm.classList.remove('hidden');  // Quita la clase que lo oculta
        registerForm.style.display = 'block';  // Asegura que sea visible

        console.log("Formulario de login mostrado.");
    
            // Restaurar la opacidad lentamente
            contenedor.classList.remove('fade-out');
            contenedor.classList.add('fade-in');
        }, 1000); // 1.5 segundos de transición
    });
   
    document.querySelector(".register-form").addEventListener("submit", function(e) {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional
    
        let inputs = document.querySelectorAll(".register-form input");
        let camposVacios = false;
    
        // Verificar si hay campos vacíos antes de continuar
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                camposVacios = true;
                input.style.border = "2px solid red"; // Resaltar inputs vacíos
            } else {
                input.style.border = "2px solid white"; // Restaurar borde si está lleno
            }
        });
    
        if (camposVacios) {
            document.getElementById("error-message").classList.remove("hidden"); // Mostrar mensaje de error
            return; // No permite continuar hasta que los campos estén llenos
        }
    
        console.log("Enviando datos al servidor...");
    
        // Recoger los datos del formulario
        nombreUsuario = document.getElementById('nombre').value;
        nickName = document.getElementById('nickName').value;

        cambiarPantalla();
       
    });
    
    // Función para cambiar la pantalla (solo después de que el registro sea exitoso)
    function cambiarPantalla() {
        console.log("Cambiando a pantalla negra...");
    
        // Ocultar el formulario de registro después de la validación
        document.querySelector(".register-container").classList.add("hidden");
    
        // Cambiar el fondo a negro
        let contenedor = document.querySelector(".contenedor-video");
        contenedor.style.backgroundImage = "url('/static/Users/images/fondos/fondoInicio.jpg')";
        contenedor.style.backgroundSize = "cover";
        contenedor.style.backgroundPosition = "center";
    
        console.log("Pantalla negra activada.");
    
        // Esperar 1 segundo antes de mostrar el texto con animación de escritura y las imágenes
        setTimeout(() => {
            mostrarTextoEscribiendo("Elige a tu avatar", "aventura-texto", () => {
                document.getElementById("aventura-container").classList.add("show"); // Mostrar contenedor del texto
                document.getElementById("imagenes-companeros").classList.add("show"); // Ahora sí, mostrar las imágenes
            });
        }, 1000);
    }
    
    
    
    
    // Función para escribir el texto como si alguien lo escribiera
    function mostrarTextoEscribiendo(texto, elementoId, callback) {
        let i = 0;
        let elemento = document.getElementById(elementoId);
        elemento.innerHTML = ""; // Limpiar contenido previo
    
        function escribir() {
            if (i < texto.length) {
                elemento.innerHTML += texto.charAt(i);
                i++;
                setTimeout(escribir, 50); // Velocidad de escritura (ajustable)
            } else if (callback) {
                callback(); // Llamar a la función de callback cuando termine
            }
        }
        escribir();
    }
    
    
    // ** Cerrar mensaje de error al hacer clic en "Aceptar" **
    document.getElementById("close-error").addEventListener("click", function() {
        document.getElementById("error-message").classList.add("hidden");
    });
    
    document.querySelectorAll(".pokemon-img").forEach(img => {
        img.addEventListener("click", function() {
           // avatarSeleccionado = this.src; // Guarda la ruta del avatar seleccionado
            //console.log("Avatar seleccionado:", avatarSeleccionado);
            let avatarSeleccionado = this.src; // Guarda la ruta del avatar seleccionado
            let confirmacionContainer = document.getElementById("confirmacion-container");
            
            // Mostrar la confirmación con estilo de píxeles
            confirmacionContainer.classList.remove("hidden");
            confirmacionContainer.classList.add("show");
    
            // Evento para confirmar la selección
            document.getElementById("confirmar-avatar").addEventListener("click", function() {
                console.log("Compañero elegido:", avatarSeleccionado);
                
                // Ocultar el cuadro de confirmación
                confirmacionContainer.classList.remove("show");
    
                // Ocultar el contenedor de selección de avatar
                document.getElementById("aventura-container").classList.add("hidden");
                document.getElementById("companero-container").classList.add("hidden");

                setTimeout(() => {
                    mostrarTextoEscribiendo("Elige un Pokémon que te acompañará en esta aventura...", "companero-texto", () => {
                        document.getElementById("companero-container").classList.remove("hidden");
                        document.getElementById("companero-container").classList.add("show");
                        document.getElementById("imagenes-companero2").classList.add("show");
                    });
                }, 100);

            });
    
            // Evento para cancelar la selección
            document.getElementById("cancelar-avatar").addEventListener("click", function() {
                confirmacionContainer.classList.remove("show");
            });


        });
    });
    
    document.querySelectorAll(".pokemon-img2").forEach(img => {
        img.addEventListener("click", function() {
            //pokemonSeleccionado = this.src; // Guarda la ruta del Pokémon seleccionado
            //console.log("Pokémon seleccionado:", pokemonSeleccionado);
            let pokemonSeleccionado = this.src;
            let confirmacionPokemon = document.getElementById("confirmacion-pokemon");
    
            confirmacionPokemon.classList.remove("hidden");
            confirmacionPokemon.classList.add("show");
    
            document.getElementById("confirmar-pokemon").addEventListener("click", function() {

            
                console.log("Pokémon elegido:", pokemonSeleccionado);
    
                confirmacionPokemon.classList.remove("show");
                confirmacionPokemon.classList.add("hidden");
                document.getElementById("companero-container").classList.add("hidden");
                document.getElementById("aventura-container").classList.add("hidden");
                document.getElementById("companero-container").classList.add("hidden");
                document.getElementById("imagenes-companeros2").classList.add("hidden");
                // Mostrar el botón "Crear Cuenta" después de 1 segundo
                setTimeout(() => {
                    document.getElementById("crear-cuenta-container").classList.remove("hidden");
                    document.getElementById("crear-cuenta-container").classList.add("show");
                }, 1000);
            });
    
            document.getElementById("cancelar-pokemon").addEventListener("click", function() {
                confirmacionPokemon.classList.remove("show");
            });
        });
    });


    document.getElementById('crear-cuenta').addEventListener('click', function() {
        console.log("Botón 'Crear Cuenta' presionado.");
    
    
        // Crear el objeto de datos a enviar
        const data = {
            nombre: nombreUsuario,
            nickName: nickName,
            id_instructor: avatarSeleccionado,  // Usamos las variables globales aquí
            id_mascota: pokemonSeleccionado  // Usamos las variables globales aquí
        };
    
        // Enviar los datos al backend usando fetch
        fetch('/usuarios/crear/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Si estás usando CSRF, agrega el token aquí
                //'X-CSRFToken': csrf_token // Descomentar si el CSRF está habilitado
            },
            body: JSON.stringify(data) // Convertir el objeto data a JSON
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error); // Si el backend devuelve un error, lo mostramos
            } else {
                alert('Usuario creado exitosamente');
                console.log(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al crear la cuenta');
        });
    });
    
       

    
    
});