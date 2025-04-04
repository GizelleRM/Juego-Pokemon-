from django.urls import path,include
from django.urls import path
from django.shortcuts import redirect
from . import views


from .views import crear_usuario, listar_usuarios,home,vista_mapa,login_usuario, instructora, evolucion, actualizar_nivel_usuario
urlpatterns = [
    path('',home, name="home"),
    path('usuarios/', listar_usuarios, name = 'listar_usuarios'),
    path('usuarios/crear/', crear_usuario, name  = 'crear_usuario'),
    path('mapa/<str:nickname>/', vista_mapa, name='vista_mapa'),
    path('login/', login_usuario, name='login_usuario'),
    path('usuarios/instructora/', instructora, name='instructora'),  # Nueva ruta
    path('evolucion/', evolucion, name='evolucion'),
    path('mapa/<str:nickname>/nivel1/', lambda request, nickname: redirect('/nivel1/')),
    path('mapa/<str:nickname>/nivel<int:nivel>/', views.redireccionar_a_nivel, name='redirigir_nivel'),
    path('usuarios/actualizar-nivel/', actualizar_nivel_usuario, name='actualizar_nivel'),
]