from django.urls import path
from .views import nivel9
urlpatterns = [
    path('',nivel9, name="nivel9"),
    # en nivel9/urls.py
    path('<str:nickname>/', nivel9, name='nivel9')
]