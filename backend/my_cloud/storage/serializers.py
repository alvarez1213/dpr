from storage.models import Users, Files
from rest_framework import serializers


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'


class ErrorSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=200)
    input_name = serializers.CharField(max_length=50)

