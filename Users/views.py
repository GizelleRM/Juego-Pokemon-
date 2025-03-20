from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Users
import json

def home(request):
    return render(request, 'Users/home.html')

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
