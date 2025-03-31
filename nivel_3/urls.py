# Importamos la función 'path' para definir rutas URL
from django.urls import path

# Importamos la vista que se va a utilizar en esta app (nivel_3)
from .views import nivel_3

# Definimos las rutas URL específicas de esta app (nivel_3)
urlpatterns = [
    # Ruta que responde a la URL /mapa/<nickname>/nivel-3/
    # <str:nickname> indica que se espera un parámetro de tipo string llamado nickname
    # Esta ruta ejecuta la vista 'nivel_3' y le da el nombre interno 'nivel_3' para usarla en el proyecto
    path('mapa/<str:nickname>/nivel-3/', nivel_3, name='nivel_3'),
]