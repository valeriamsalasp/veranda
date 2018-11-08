from django.db import models
from django.contrib.auth.models import User
from django.core.files.base import ContentFile



class Note(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.TextField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    color = models.TextField(max_length=7, default='#FFFFFF')