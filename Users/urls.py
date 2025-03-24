from django.urls import path
from .views import crear_usuario, listar_usuarios,home,vista_mapa,login_usuario
urlpatterns = [
    path('',home, name="home"),
    path('usuarios/', listar_usuarios, name = 'listar_usuarios'),
    path('usuarios/crear/', crear_usuario, name  = 'crear_usuario'),
    path('mapa/<str:nickname>/', vista_mapa, name='vista_mapa'),
    path('login/', login_usuario, name='login_usuario'),
]

