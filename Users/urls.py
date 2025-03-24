from django.urls import path
from django.urls import path
from .views import crear_usuario, listar_usuarios, home, evolucion

urlpatterns = [
    path('', home, name="home"),
    path('usuarios/', listar_usuarios, name='listar_usuarios'),
    path('usuarios/crear/', crear_usuario, name='crear_usuario'),
    path('evolucion/', evolucion, name='evolucion'),
]
