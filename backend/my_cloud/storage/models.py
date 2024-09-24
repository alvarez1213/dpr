from django.db import models
from uuid import uuid4
import os
import datetime


class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default='USER')

    def __str__(self):
        return self.username    
    
    class Meta:
        ordering = ['full_name']
        verbose_name = 'User'
        verbose_name_plural = 'Users'

def user_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid4().hex[:8]}.{ext}'
    return os.path.join('storage_files', instance.user.username, filename)

class Files(models.Model):    
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    user = models.ForeignKey(Users, on_delete=models.SET_DEFAULT, related_name='files', default=1)
    comment = models.CharField(max_length=500, default='')
    size = models.IntegerField(default=0)
    image = models.FileField(upload_to=user_path, default='')
    last_download = models.DateTimeField(null=True)

    def __str__(self):
        return self.title    
    
    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'