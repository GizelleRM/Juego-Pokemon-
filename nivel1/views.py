from django.shortcuts import render
from .models import Pregunta  # Importamos el modelo de Pregunta para acceder a las preguntas y opciones
from Users.models import Users  # Importa el modelo Users desde la app principal
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

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

# Vista que muestra una pantalla básica del nivel 1
def nivel1(request):
    # Renderiza una plantilla simple del nivel, como introducción o menú del nivel
    return render(request, 'nivel1.html')



# Vista principal del cuestionario
# Vista principal del cuestionario
def cuestionario(request):
    preguntas = Pregunta.objects.prefetch_related('opciones').all()

    if request.method == "POST":
        aciertos = 0
        total = preguntas.count()
        nickname = request.session.get('nickname')

        for pregunta in preguntas:
            respuesta = request.POST.get(str(pregunta.id))
            if respuesta:
                opcion = pregunta.opciones.get(id=respuesta)
                if opcion.es_correcta:
                    aciertos += 1

        # 🔹 Lógica para actualizar nivel si tiene 4 o más aciertos
        if aciertos >= 4 and nickname:
            try:
                usuario = Users.objects.get(nickName=nickname)
                if usuario.nivel < 2:
                    usuario.nivel = 2
                    usuario.save()
            except Users.DoesNotExist:
                print("Usuario no encontrado para actualizar nivel")

        return render(request, 'resultado.html', {
            'aciertos': aciertos,
            'total': total,
            'nickname': nickname
        })

    return render(request, 'Formulario.html', {
        'preguntas': preguntas
    })
