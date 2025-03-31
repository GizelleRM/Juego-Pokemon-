# Importamos funciones necesarias desde Django
from django.shortcuts import render, get_object_or_404

# Importamos el modelo de usuarios desde la app Users
from Users.models import Users

# Vista que representa el Nivel 3 del juego para un usuario en específico
def nivel_3(request, nickname):
    # Obtenemos el usuario desde la base de datos, usando el nickname proporcionado en la URL
    usuario = get_object_or_404(Users, nickName=nickname)

    # Definimos cuál es el nivel actual asociado a esta vista
    nivel_actual = 3

    # Preparamos el contexto que se enviará al template HTML
    contexto = {
        # Incluimos el nickname para mostrarlo o reutilizarlo en el frontend
        'nickName': usuario.nickName,

        # Definimos la ruta de la imagen del avatar según su ID de instructor. Si no tiene, se usa una imagen por defecto
        'avatar_url': (
            f'Users/images/avatars/avatar{usuario.id_instructor}/Avatar1Parado.png'
            if usuario.id_instructor
            else 'Users/images/avatars/default.png'
        ),

        # Definimos la ruta de la imagen del Pokémon. Si no tiene mascota asignada, se usa una por defecto
        'pokemon_url': (
            f'Users/images/pokemones/squirtle/squirtle.png'
            if usuario.id_mascota
            else 'Users/images/pokemones/default.png'
        ),

        # Incluimos el nivel que tiene el usuario guardado en la base de datos
        'nivel': usuario.nivel,

        # También mandamos el número del nivel actual para comparaciones en el template si es necesario
        'nivel_actual': nivel_actual,

        # Esta variable controla si se debe mostrar el botón "Volver al mapa":
        # Se mostrará si el usuario ya alcanzó o superó este nivel
        'mostrar_volver': usuario.nivel >= nivel_actual
    }

    # Renderizamos el template del nivel 3, enviando el contexto al archivo HTML correspondiente
    return render(request, 'nivel_3/nivel-3.html', contexto)
