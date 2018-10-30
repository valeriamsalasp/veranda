from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    title = models.CharField(max_length=100, blank=True, default = '')
    description = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)


