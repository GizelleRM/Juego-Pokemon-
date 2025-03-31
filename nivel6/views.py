from django.shortcuts import render
from .models import Pregunta  # Importamos el modelo de Pregunta para acceder a las preguntas y opciones
from Users.models import Users  # Importa el modelo Users desde la app principal
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt



def inicio(request):
    nickname = request.session.get('nickname', 'Invitado')  # o como lo guardes
    return render(request, 'nivel6/nivel6.html', {'nickname': nickname})
@csrf_exempt
def actualizar_nivel_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        nickname = data.get('nickName')
        nuevo_nivel = data.get('nivel')
        print("Recibido:", nickname, nuevo_nivel)
        try:
            usuario = Users.objects.get(nickName=nickname)
            if nuevo_nivel > usuario.nivel:
                usuario.nivel = nuevo_nivel
                usuario.save()
            return JsonResponse({'mensaje': 'Nivel actualizado correctamente'})
        except Users.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
