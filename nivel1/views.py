from django.shortcuts import render
from .models import Pregunta  # Importamos el modelo de Pregunta para acceder a las preguntas y opciones

# Vista que muestra una pantalla básica del nivel 1
def nivel1(request):
    # Renderiza una plantilla simple del nivel, como introducción o menú del nivel
    return render(request, 'nivel1.html')


# Vista principal del cuestionario
def cuestionario(request):
    # Obtenemos todas las preguntas junto con sus opciones relacionadas para evitar consultas extra (optimizamos con prefetch_related)
    preguntas = Pregunta.objects.prefetch_related('opciones').all()

    # Si el usuario envía el formulario (método POST)
    if request.method == "POST":
        aciertos = 0  # Contador de respuestas correctas
        total = preguntas.count()  # Total de preguntas mostradas

        # Recorremos todas las preguntas para comparar las respuestas enviadas
        for pregunta in preguntas:
            # Obtenemos la respuesta enviada para esta pregunta usando su ID como nombre del input
            respuesta = request.POST.get(str(pregunta.id))
            if respuesta:
                # Verificamos si la opción seleccionada es la correcta
                opcion = pregunta.opciones.get(id=respuesta)
                if opcion.es_correcta:
                    aciertos += 1  # Sumamos al contador de aciertos

        # Mostramos los resultados en una plantilla específica
        return render(request, 'resultado.html', {
            'aciertos': aciertos,
            'total': total
        })

    # Si es una petición GET, mostramos el formulario con las preguntas y opciones
    return render(request, 'Formulario.html', {
        'preguntas': preguntas
    })
