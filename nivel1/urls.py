from django.urls import path
from .views import nivel1, cuestionario,actualizar_nivel_usuario
urlpatterns = [
    path('',nivel1, name="nivel1"),
    path('cuestionario/<int:nivel>/', cuestionario, name='cuestionario_nivel'),
    # en nivel1/urls.py
    path('<str:nickname>/', nivel1, name='nivel1'),
    path('actualizar-nivel/', actualizar_nivel_usuario, name='actualizar_nivel_usuario'),
]