from django.test import TestCase, Client
from django.urls import reverse
from Users.models import Users  # importa tu modelo de usuario
class Nivel2Tests(TestCase):

    def setUp(self):
        # Creamos un usuario de prueba para usar en los tests
        self.usuario = Users.objects.create(
            nickName="prueba123",
            id_instructor=1,
            id_mascota=1,
            nivel=2
        )
        self.client = Client()  # Cliente de prueba para simular peticiones

    def test_acceso_a_vista_nivel_2(self):
        # Llamamos a la URL con el nickname creado
        url = reverse('nivel_2', args=[self.usuario.nickName])
        response = self.client.get(url)

        # Comprobamos que la respuesta fue exitosa (HTTP 200)
        self.assertEqual(response.status_code, 200)

        # Comprobamos que el template correcto fue usado
        self.assertTemplateUsed(response, 'nivel_2/nivel-2.html')

        # Comprobamos que el contexto contiene el nickname
        self.assertContains(response, self.usuario.nickName)
