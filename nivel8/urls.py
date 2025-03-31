from django.urls import path
from .views import nivel8
urlpatterns = [
    path('',nivel8, name="nivel8"),
]