from django.test import TestCase
from django.urls import reverse
from Users.models import Users

class Nivel3ViewTest(TestCase):
    def setUp(self):
        self.usuario = Users.objects.create(
            nickName="ash_ketchum",
            id_instructor=1,
            id_mascota=1,
            nivel=3
        )

    def test_acceso_nivel_3(self):
        url = reverse('nivel_3', args=[self.usuario.nickName])
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'nivel_3/nivel-3.html')
        self.assertContains(response, self.usuario.nickName)
        self.assertIn('mostrar_volver', response.context)
        self.assertTrue(response.context['mostrar_volver'])
