from django.urls import path
from .views import nivel10, cuestionario,actualizar_nivel_usuario
urlpatterns = [
    path('',nivel10, name="nivel10"),
    path('cuestionario/<int:nivel>/', cuestionario, name='cuestionario_nivel'),
    # en nivel10/urls.py
    path('<str:nickname>/', nivel10, name='nivel10'),
    path('actualizar-nivel/', actualizar_nivel_usuario, name='actualizar_nivel_usuario'),
]