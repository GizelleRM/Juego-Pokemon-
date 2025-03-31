from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Users
import json
from django.http import HttpResponse

def home(request):
    return render(request, 'Users/home.html')
def evolucion(request):
    return render(request, 'Users/evolucion.html')

# Vista para la página de instructora
def instructora(request):
    return render(request, 'Users/instructora.html')

# 🔹 Crear usuario
@csrf_exempt
def crear_usuario(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)

            # Verificar si el nickName ya existe
            if Users.objects.filter(nickName=datos['nickName']).exists():
                return JsonResponse({'error': 'El nickName ya está en uso, elige otro.'}, status=400)

            # Validar id_instructor e id_mascota
            id_instructor = datos.get('id_instructor')
            id_mascota = datos.get('id_mascota')

            # Si los valores están en None, se guardarán como None
            usuario = Users.objects.create(
                nombre=datos['nombre'],
                nickName=datos['nickName'],
                nivel=datos.get('nivel', 1),
                id_instructor=id_instructor if id_instructor else None,
                id_mascota=id_mascota if id_mascota else None
            )

            return JsonResponse({
                'mensaje': 'Usuario creado',
                'id': usuario.id,  # Ahora `id` es un entero generado por Django para SQLite
                'nivel': usuario.nivel,
                'id_instructor': usuario.id_instructor,
                'id_mascota': usuario.id_mascota
            }, status=201)

        except KeyError as e:
            return JsonResponse({'error': f'Falta el campo {str(e)}'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON mal formado'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

# 🔹 Obtener todos los usuarios
def listar_usuarios(request):
    usuarios = Users.objects.all().values()

    # Convertir id_instructor e id_mascota a string si no son None
    usuarios_serializables = []
    for usuario in usuarios:
        usuario["id"] = usuario["id"]  # Ya no es necesario convertir a string
        usuario["id_instructor"] = str(usuario["id_instructor"]) if usuario["id_instructor"] else None
        usuario["id_mascota"] = str(usuario["id_mascota"]) if usuario["id_mascota"] else None
        usuarios_serializables.append(usuario)

    return JsonResponse(usuarios_serializables, safe=False)

def vista_mapa(request, nickname):
    usuario = get_object_or_404(Users, nickName=nickname)

    #Si el nivel se guardó en base, aquí lo necesitas recargar correctamente
    avatar_url = f'Users/images/avatars/avatar{usuario.id_instructor}/Avatar1Parado.png' if usuario.id_instructor else 'Users/images/avatars/default.png'
    pokemon_url = f'Users/images/pokemones/squirtle/squirtle.png' if usuario.id_mascota else 'Users/images/pokemones/default.png'

    contexto = {
        'nickName': usuario.nickName,
        'avatar_url': avatar_url,
        'pokemon_url': pokemon_url,
        'nivel': usuario.nivel  #este valor debe venir actualizado desde DB
    }

    return render(request, 'Users/mapa.html', contexto)
@csrf_exempt
def login_usuario(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)
            nickname = datos.get('nickName')

            usuario = Users.objects.filter(nickName=nickname).first()

            if usuario:
                return JsonResponse({
                    'mensaje': 'Inicio de sesión exitoso',
                    'redirect_url': f'/mapa/{usuario.nickName}/'
                }, status=200)
            else:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON mal formado'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

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
