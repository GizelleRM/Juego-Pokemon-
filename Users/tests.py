import pytest
import json
from django.urls import reverse
from Users.models import Users

@pytest.mark.django_db
def test_crear_usuario(client):
    """ Prueba crear un usuario exitosamente con los nuevos campos """
    url = reverse('crear_usuario')
    data = {
        "nombre": "Juan Pérez",
        "nickName": "Juanito123",
        "nivel": 1,
        "id_instructor": None,  # No asignamos instructor aún
        "id_mascota": None  # No asignamos mascota aún
    }

    response = client.post(url, data=json.dumps(data), content_type="application/json")

    assert response.status_code == 201
    assert Users.objects.count() == 1
    usuario = Users.objects.first()
    
    assert usuario.nickName == "Juanito123"
    assert usuario.nivel == 1
    assert usuario.id_instructor is None
    assert usuario.id_mascota is None


@pytest.mark.django_db
def test_crear_usuario_nickname_repetido(client):
    """ Prueba que no se pueda crear un usuario con un nickName ya existente """
    Users.objects.create(nombre="Carlos", nickName="Juanito123", nivel=1)
    
    url = reverse('crear_usuario')
    data = {
        "nombre": "Pedro Ramírez",
        "nickName": "Juanito123",
        "nivel": 3,
        "id_instructor": None,
        "id_mascota": None
    }
    
    response = client.post(url, data=json.dumps(data), content_type="application/json")
    
    assert response.status_code == 400
    assert response.json()["error"] == "El nickName ya está en uso, elige otro."


@pytest.mark.django_db
def test_listar_usuarios(client):
    """ Prueba obtener la lista de usuarios incluyendo nivel e id_instructor/mascota """
    # Los IDs de instructor y mascota ahora son enteros generados automáticamente por Django
    usuario_juan = Users.objects.create(nombre="Juan", nickName="Juanito123", nivel=5)
    usuario_pedro = Users.objects.create(nombre="Pedro", nickName="Pedro456", nivel=2)

    url = reverse('listar_usuarios')
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

    # Validar datos del primer usuario
    assert data[0]["nickName"] == "Juanito123"
    assert data[0]["nivel"] == 5
    assert data[0]["id_instructor"] is None  # Ya no hay ObjectId, solo None
    assert data[0]["id_mascota"] is None  # Ya no hay ObjectId, solo None

    # Validar datos del segundo usuario
    assert data[1]["nickName"] == "Pedro456"
    assert data[1]["nivel"] == 2
    assert data[1]["id_instructor"] is None
    assert data[1]["id_mascota"] is None
