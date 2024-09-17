from django.contrib import admin

from storage.models import Users, Files

# Register your models here.

@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'full_name', 'password', 'role']

@admin.register(Files)
class FilesAdmin(admin.ModelAdmin):
    list_display = ['title', 'comment', 'size', 'created', 'user']
