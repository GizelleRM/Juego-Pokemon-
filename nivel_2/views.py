# Importa el método 'render' para renderizar plantillas HTML
# e 'importa' get_object_or_404 para buscar un objeto o lanzar un error 404 si no existe
from django.shortcuts import render, get_object_or_404

# Importa el modelo 'Users' desde la app Users
from Users.models import Users


# Vista para manejar el nivel 2 del juego
def nivel_2(request, nickname):
    # Busca al usuario en la base de datos usando su nickname
    # Si no lo encuentra, lanza un error 404
    usuario = get_object_or_404(Users, nickName=nickname)

    # Define cuál es el nivel actual que corresponde a esta vista
    nivel_actual = 2

    # Construye el diccionario de contexto que se enviará a la plantilla HTML
    contexto = {
        # Nickname del usuario (lo usaremos en la URL, en JS y para mostrar información)
        'nickName': usuario.nickName,

        # Ruta a la imagen del avatar del usuario
        'avatar_url': f'Users/images/avatars/avatar{usuario.id_instructor}/Avatar1Parado.png'
            if usuario.id_instructor else 'Users/images/avatars/default.png',

        # Ruta a la imagen del Pokémon del usuario
        'pokemon_url': f'Users/images/pokemones/squirtle/squirtle.png'
            if usuario.id_mascota else 'Users/images/pokemones/default.png',

        # Nivel guardado del usuario (progreso actual)
        'nivel': usuario.nivel,

        # Nivel correspondiente a esta vista (nivel 2)
        'nivel_actual': nivel_actual,

        # Muestra el botón "Volver al mapa" si ya alcanzó o superó este nivel
        'mostrar_volver': usuario.nivel >= nivel_actual
    }

    # Renderiza la plantilla HTML con los datos del contexto
    return render(request, 'nivel_2/nivel-2.html', contexto)
