from django.apps import AppConfig

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.AutoField'  # Cambiado para SQLite
    name = 'Users'
