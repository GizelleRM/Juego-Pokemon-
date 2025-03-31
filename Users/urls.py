from django.urls import path,include
from django.shortcuts import redirect
from .views import crear_usuario, listar_usuarios,home,vista_mapa,login_usuario, instructora, evolucion,nivel_2,nivel_3,nivel_4, actualizar_nivel_usuario
urlpatterns = [
    path('',home, name="home"),
    path('usuarios/', listar_usuarios, name = 'listar_usuarios'),
    path('usuarios/crear/', crear_usuario, name  = 'crear_usuario'),
    path('mapa/<str:nickname>/', vista_mapa, name='vista_mapa'),
    path('login/', login_usuario, name='login_usuario'),
    path('usuarios/instructora/', instructora, name='instructora'),  # Nueva ruta
    path('evolucion/', evolucion, name='evolucion'),
    path('mapa/<str:nickname>/nivel1/', lambda request, nickname: redirect('/nivel1/')),
    path('mapa/<str:nickname>/nivel-2/', nivel_2, name='nivel_2'),
    path('mapa/<str:nickname>/nivel-3/', nivel_3, name='nivel_3'),
    path('mapa/<str:nickname>/nivel-4/', nivel_4, name='nivel_4'),
    path('usuarios/actualizar-nivel/', actualizar_nivel_usuario, name='actualizar_nivel'),
]