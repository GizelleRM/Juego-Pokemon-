from django.db import models

class Pregunta(models.Model):
    texto = models.CharField(max_length=255)
    nivel = models.IntegerField()
    # otros campos

    def __str__(self):
        return self.texto
