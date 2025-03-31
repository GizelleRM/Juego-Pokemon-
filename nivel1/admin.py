from django.contrib import admin
from .models import Pregunta, Opcion

# Registramos el modelo Pregunta para que aparezca en el panel de administración de Django
admin.site.register(Pregunta)

# Registramos el modelo Opcion para gestionarlo también desde el panel de administración
admin.site.register(Opcion)
