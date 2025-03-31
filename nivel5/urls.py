from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio_nivel5'),
    path('usuarios/actualizar-nivel/', views.actualizar_nivel_usuario, name='actualizar_nivel'),

]
