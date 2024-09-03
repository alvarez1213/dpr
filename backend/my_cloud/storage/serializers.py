from storage.models import Users, Files
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['id', 'username', 'full_name', 'email', 'password', 'role', 'path_to_user']


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'title', 'path_to_file', 'user']
