import pytest
from django.urls import reverse
from nivel1.models import Pregunta, Opcion

@pytest.mark.django_db
def test_cuestionario_get(client):
    """Verifica que la vista del cuestionario se muestre correctamente."""
    response = client.get(reverse('cuestionario'))
    assert response.status_code == 200
    assert b"Cuestionario" in response.content

@pytest.mark.django_db
def test_cuestionario_post_con_aciertos(client):
    """Simula responder correctamente el cuestionario."""

    # Creamos una pregunta con una opción correcta
    pregunta = Pregunta.objects.create(texto="¿Cuál es el tipo de dato para texto?")
    opcion_correcta = Opcion.objects.create(pregunta=pregunta, texto="str", es_correcta=True)
    Opcion.objects.create(pregunta=pregunta, texto="int", es_correcta=False)

    # Simulamos enviar el formulario con la respuesta correcta
    data = {
        str(pregunta.id): str(opcion_correcta.id)
    }

    response = client.post(reverse('cuestionario'), data)
    assert response.status_code == 200
    assert b"1 de 1" in response.content or b"Obtuviste 1 de 1" in response.content

@pytest.mark.django_db
def test_cuestionario_post_con_error(client):
    """Simula responder incorrectamente el cuestionario."""

    pregunta = Pregunta.objects.create(texto="¿Cuál es el tipo de dato para números enteros?")
    opcion_incorrecta = Opcion.objects.create(pregunta=pregunta, texto="float", es_correcta=False)
    Opcion.objects.create(pregunta=pregunta, texto="int", es_correcta=True)

    data = {
        str(pregunta.id): str(opcion_incorrecta.id)
    }

    response = client.post(reverse('cuestionario'), data)
    assert response.status_code == 200
    assert b"0 de 1" in response.content or b"Obtuviste 0 de 1" in response.content

@pytest.mark.django_db
def test_cuestionario_actualiza_nivel_si_tiene_4_aciertos(client):
    # Crear usuario con nivel 1
    from Users.models import Users
    usuario = Users.objects.create(nickName="giztest", nombre="Giz", nivel=1)

    # Guardar nickname en la sesión (simular login)
    session = client.session
    session['nickname'] = usuario.nickName
    session.save()

    # Crear 4 preguntas con opción correcta
    data = {}
    for i in range(4):
        pregunta = Pregunta.objects.create(texto=f"Pregunta {i+1}")
        opcion_correcta = Opcion.objects.create(pregunta=pregunta, texto="Correcta", es_correcta=True)
        Opcion.objects.create(pregunta=pregunta, texto="Incorrecta", es_correcta=False)
        data[str(pregunta.id)] = str(opcion_correcta.id)

    # Simular envío del cuestionario
    response = client.post(reverse('cuestionario'), data)

    # Recargar el usuario desde la base de datos
    usuario.refresh_from_db()

    # Verificar que su nivel subió a 2
    assert usuario.nivel == 2
    assert response.status_code == 200
    assert b"4 de 4" in response.content or b"Obtuviste 4 de 4" in response.content
