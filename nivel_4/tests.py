from django.test import TestCase
from django.urls import reverse
from Users.models import Users

class Nivel4ViewTest(TestCase):
    def setUp(self):
        self.usuario = Users.objects.create(
            nickName="misty",
            id_instructor=2,
            id_mascota=2,
            nivel=4  # Este usuario ya alcanzó el nivel 4
        )

    def test_acceso_nivel_4(self):
        url = reverse('nivel_4', args=[self.usuario.nickName])
        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)  # Verifica respuesta exitosa
        self.assertTemplateUsed(response, 'nivel_4/nivel-4.html')  # Usa el template correcto
        self.assertContains(response, self.usuario.nickName)  # El nickName está en el contenido
        self.assertIn('mostrar_volver', response.context)  # El contexto contiene la variable
        self.assertTrue(response.context['mostrar_volver'])  # Se permite mostrar botón de volver
