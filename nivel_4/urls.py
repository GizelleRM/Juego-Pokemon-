# Importamos la función path para definir rutas y la vista nivel_4 que se usará
from django.urls import path
from .views import nivel_4

# Definimos las rutas específicas de esta app (nivel_4)
urlpatterns = [
    # Ruta para acceder al nivel 4, que incluye el nickname del usuario en la URL
    # Esta vista se llamará 'nivel_4' y se usará para mostrar el nivel 4 en el juego
    path('mapa/<str:nickname>/nivel-4/', nivel_4, name='nivel_4'),
]