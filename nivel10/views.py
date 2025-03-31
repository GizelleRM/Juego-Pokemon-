from django.shortcuts import render
from nivel1.models import Pregunta  # ← Importa el modelo correcto
from Users.models import Users
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime

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

def nivel10(request):
    return render(request, 'nivel10.html', {
        'timestamp': datetime.now().timestamp()  # Agrega esto
    })

def cuestionario(request, nivel):
    preguntas = Pregunta.objects.filter(nivel=nivel).prefetch_related('opciones')
    nickname = request.session.get('nickname')

    if request.method == "POST":
        aciertos = 0
        total = preguntas.count()

        for pregunta in preguntas:
            respuesta = request.POST.get(str(pregunta.id))
            if respuesta:
                opcion = pregunta.opciones.get(id=respuesta)
                if opcion.es_correcta:
                    aciertos += 1

        if aciertos >= 10 and nickname:
            try:
                usuario = Users.objects.get(nickName=nickname)
                if usuario.nivel < nivel + 1:
                    usuario.nivel = nivel + 1
                    usuario.save()
            except Users.DoesNotExist:
                pass

        return render(request, 'resultado.html', {
            'aciertos': aciertos,
            'total': total,
            'nivel': nivel,
            'nickname': nickname
        })

    return render(request, 'Formulario.html', {
        'preguntas': preguntas,
        'nivel': nivel
    })
