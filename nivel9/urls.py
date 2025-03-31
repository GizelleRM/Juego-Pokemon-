from django.urls import path
from .views import nivel9
urlpatterns = [
    path('',nivel9, name="nivel9"),
]
