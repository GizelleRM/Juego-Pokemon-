from django.db import models

class Users(models.Model):
    id = models.AutoField(primary_key=True)  # Usa AutoField en SQLite
    nombre = models.CharField(max_length=100)
    nickName = models.CharField(max_length=100, unique=True)
    nivel = models.IntegerField(default=1)  # Inicia en 1
    id_instructor = models.IntegerField(null=True, blank=True)  # Puede ser una clave foránea
    id_mascota = models.IntegerField(null=True, blank=True)  # Puede ser una clave foránea

    def __str__(self):
        return self.nombre
    
    class Meta:
        db_table = 'users'  # Especifica el nombre de la tabla