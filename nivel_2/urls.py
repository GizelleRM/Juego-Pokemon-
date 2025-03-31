# Importa la función 'path' que se usa para definir rutas en Django
from django.urls import path

# Importa la vista 'nivel_2' desde el archivo views.py de esta misma app
from .views import nivel_2

# Lista de rutas URL que pertenecen a esta app
urlpatterns = [
    # Ruta para acceder al nivel 2 del mapa.
    # '<str:nickname>' es una variable que se pasará a la vista.
    # La vista asociada es 'nivel_2' y el nombre interno de la ruta es 'nivel_2'.
    path('mapa/<str:nickname>/nivel-2/', nivel_2, name='nivel_2'),
]