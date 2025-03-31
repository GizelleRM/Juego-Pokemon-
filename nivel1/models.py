from django.db import models

# Modelo que representa una pregunta del cuestionario
class Pregunta(models.Model):
    # Campo de texto que contiene el enunciado de la pregunta
    texto = models.CharField(max_length=255)
    nivel = models.PositiveIntegerField(default=1)  # 🔸 Nivel al que pertenece la pregunta
    
    # Devuelve el texto de la pregunta cuando se muestra como string (útil en el admin o consola)
    def __str__(self):
        return f"Nivel {self.nivel}: {self.texto}"


        



# Modelo que representa una opción de respuesta relacionada a una pregunta
class Opcion(models.Model):
    # Relación de muchos a uno con la tabla Pregunta (una pregunta tiene muchas opciones)
    # 'on_delete=models.CASCADE' indica que si se elimina la pregunta, también se eliminan sus opciones
    # 'related_name="opciones"' permite acceder a las opciones de una pregunta con pregunta.opciones.all()
    pregunta = models.ForeignKey(Pregunta, on_delete=models.CASCADE, related_name='opciones')
    
    # Texto que contiene el contenido de la opción de respuesta
    texto = models.CharField(max_length=255)
    
    # Valor booleano que indica si esta opción es la correcta
    es_correcta = models.BooleanField(default=False)

    def __str__(self):
        # Devuelve el texto de la opción y especifica si es correcta o incorrecta (útil para revisar en admin o consola)
        return f"{self.texto} ({'Correcta' if self.es_correcta else 'Incorrecta'})"
