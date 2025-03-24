from django.urls import path
from .views import crear_usuario, listar_usuarios, home, evolucion , instructora

urlpatterns = [
    path('', home, name="home"),
    path('usuarios/', listar_usuarios, name='listar_usuarios'),
    path('usuarios/crear/', crear_usuario, name='crear_usuario'),
    path('usuarios/instructora/', instructora, name='instructora'),  # Nueva ruta
    path('evolucion/', evolucion, name='evolucion'),
]
