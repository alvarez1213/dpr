from django.db import models


class Files(models.Model):    
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    path_to_file = models.CharField(max_length=500)
    
    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'


class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    path_to_user = models.CharField(max_length=255)
    
    class Meta:
        ordering = ['full_name']
        verbose_name = 'User'
        verbose_name_plural = 'Users'
