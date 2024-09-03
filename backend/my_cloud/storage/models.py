from django.db import models

class Users(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    path_to_user = models.CharField(max_length=255)

    def __str__(self):
        return self.username    
    
    class Meta:
        ordering = ['full_name']
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Files(models.Model):    
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200)
    path_to_file = models.CharField(max_length=500)
    user = models.ForeignKey(Users, on_delete=models.SET_DEFAULT, related_name='files', default=1)

    def __str__(self):
        return self.title    
    
    class Meta:
        ordering = ['created']
        verbose_name = 'File'
        verbose_name_plural = 'Files'