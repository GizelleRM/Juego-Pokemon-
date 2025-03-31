from django.urls import path
from .views import nivel1, cuestionario
urlpatterns = [
    path('',nivel1, name="nivel1"),
    path('cuestionario', cuestionario, name="cuestionario")
]