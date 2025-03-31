"""
URL configuration for Juegos_Programacion project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from Users import views  
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('Users.urls')),
    path('admin/', admin.site.urls),  # ¡esta línea es obligatoria!
    path('nivel1/', include('nivel1.urls')),
    path('', include('nivel_2.urls')),
    path('', include('nivel_3.urls')),
    path('', include('nivel_4.urls')),
    path('nivel5/', include('nivel5.urls')),
    path('nivel6/', include('nivel6.urls')),
    path('nivel7/', include('nivel7.urls')),
    path('nivel8/', include('nivel8.urls')),
    path('nivel9', include('nivel9.urls')),
    path('nivel10/',include('nivel10.urls')),
]


