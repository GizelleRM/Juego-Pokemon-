# Importamos la función render para renderizar plantillas y get_object_or_404 para obtener un objeto o mostrar error 404 si no existe
from django.shortcuts import render, get_object_or_404

# Importamos el modelo Users desde la app Users
from Users.models import Users

# Vista para mostrar el nivel 4 del juego
def nivel_4(request, nickname):
    # Obtenemos el usuario correspondiente al nickname recibido por la URL
    usuario = get_object_or_404(Users, nickName=nickname)

    # Definimos el número del nivel actual que representa esta vista
    nivel_actual = 4

    # Creamos el contexto que se enviará al template (HTML)
    contexto = {
        'nickName': usuario.nickName,  # Nick del usuario
        # Ruta de la imagen del avatar basada en el instructor asignado (si no tiene, se usa una por defecto)
        'avatar_url': f'Users/images/avatars/avatar{usuario.id_instructor}/Avatar1Parado.png' if usuario.id_instructor else 'Users/images/avatars/default.png',
        # Ruta del Pokémon acompañante basado en el id_mascota (si no tiene, se usa una por defecto)
        'pokemon_url': f'Users/images/pokemones/squirtle/squirtle.png' if usuario.id_mascota else 'Users/images/pokemones/default.png',
        'nivel': usuario.nivel,  # Nivel actual guardado del usuario
        'nivel_actual': nivel_actual,  # Nivel de esta vista
        'mostrar_volver': usuario.nivel >= nivel_actual  # Muestra el botón de volver al mapa si ya pasó este nivel
    }

    # Renderiza la plantilla nivel-4.html con el contexto definido
    return render(request, 'nivel_4/nivel-4.html', contexto)
