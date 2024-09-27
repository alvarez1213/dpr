from django.http import Http404
from django.conf import settings
from django.contrib.auth.hashers import make_password
from passlib.handlers.django import django_pbkdf2_sha256

from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

import re
import datetime
import os
from uuid import uuid4

from storage.models import Users, Files
from storage.serializers import FilesSerializer, UsersSerializer


### Users ###

class UsersList(APIView):
    """
    List all users, or create a new user.
    """
    def get(self, request, format=None):
        users = Users.objects.all()
        user_serializer = UsersSerializer(users, many=True)
        return Response(user_serializer.data)

    def post(self, request, format=None):
        data = {
            'message': '',
            'input_name': ''
        }

        if request.data['create']:
            # Validate username
            username = request.data['username']
            
            unique_user = False
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                unique_user = True
            if not unique_user:
                data['message'] = 'Пользователь с таким логином уже существует.'
                data['input_name'] = 'username'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            
            match_symbols = re.search(r'[\'\"\`@_!#$%^&*()<>?/\|}{~:]+', username)
            if match_symbols:
                data['message'] = 'Логин должен состоять только из букв и цифр.'
                data['input_name'] = 'username'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            
            if not username[0].isalpha():
                data['message'] = 'Первым символом логина должна быть буква.'
                data['input_name'] = 'username'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            if len(username) < 4 or len(username) > 20:
                data['message'] = 'Длина логина должна быть не меньше 4 и не больше 20.'
                data['input_name'] = 'username'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            password = request.data['password']
            # Validate password
            if len(password) < 6:
                data['message'] = 'Длина пароля должна быть не меньше 6.'
                data['input_name'] = 'password'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            match_letters = re.search(r'[a-zA-Z]+', password)
            match_numbers = re.search(r'[0-9]+', password)
            match_symbols = re.search(r'[\'\"\`@_!#$%^&*()<>?/\|}{~:]+', password)
            if not match_letters or not match_numbers or not match_symbols:
                data['message'] = 'В пароле должна быть хотя бы одна буква, одна цифра и один специальный символ.'
                data['input_name'] = 'password'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            # Hashing password
            request.data['password'] = make_password(request.data['password'])

            user_serializer = UsersSerializer(data=request.data)
            if user_serializer.is_valid():
                user_serializer.save()
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Try to find user by username
            try:
                user = Users.objects.get(username=request.data['username'])
            except Users.DoesNotExist:
                data['message'] = 'Неправильное имя пользователя или пароль.'
                return Response(data, status=status.HTTP_404_NOT_FOUND)

            # Match passwords
            verify = django_pbkdf2_sha256.verify(request.data['password'], user.password)
            if not verify:
                data['message'] = 'Неправильное имя пользователя или пароль.'
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            data = {
                'id': user.pk,
                'username': user.username,
                'full_name': user.full_name,
                'email': user.email,
                'password': user.password,
                'role': user.role,
            }
            return Response(data, status=status.HTTP_200_OK)


# FOR BACKEND ONLY
class UserDetail(APIView):
    """
    Retrieve, update or delete a user.
    """
    def get_object(self, pk):
        try:
            return Users.objects.get(pk=pk)
        except Users.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        user = self.get_object(pk)
        user_serializer = UsersSerializer(user)
        return Response(user_serializer.data)

    def put(self, request, pk, format=None):
        user = self.get_object(pk)
        user_serializer = UsersSerializer(user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(user_serializer.data)
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

### Files ###

class FilesList(APIView):
    """
    List all files, or create a new file.
    """
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, format=None):
        user_id = request.GET.get('pk', None)
        if user_id == None:
            files = Files.objects.all()
            file_serializer = FilesSerializer(files, many=True)
            return Response(file_serializer.data)

        files = Files.objects.filter(user=user_id)
        file_serializer = FilesSerializer(files, many=True)
        return Response(file_serializer.data)


    def post(self, request, format=None):
        if int(request.data['size']) >= 104_857_600:
            return Response({ 'message': 'Too long'}, status=status.HTTP_400_BAD_REQUEST)

        file_serializer = FilesSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FileDetail(APIView):
    """
    Retrieve, update or delete a file.
    """
    def get_object(self, pk):
        try:
            return Files.objects.get(pk=pk)
        except Files.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        is_download = request.GET.get('download', None)
        is_special = request.GET.get('special', None)

        file = self.get_object(pk)
        if is_download:
            file.last_download = datetime.datetime.now()
            file.save()
            url = serve_download_file(request, pk)
            return Response(url)

        if is_special:
            url = serve_special_file(request, pk)
            return Response(url)

        files_serializer = FilesSerializer(file)
        return Response(files_serializer.data)

    def put(self, request, pk, format=None):
        file = self.get_object(pk)
        files_serializer = FilesSerializer(file, data=request.data)
        if files_serializer.is_valid():
            files_serializer.save()
            return Response(files_serializer.data)
        return Response(files_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        file = self.get_object(pk)
        file.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def serve_special_file(request, pk):
    file = Files.objects.get(id=pk)

    temporary_filename = f'temp_{file.pk}_{uuid4().hex[:8]}.{file.file.name.split(".")[-1]}'
    temporary_path = os.path.join(settings.MEDIA_ROOT, temporary_filename)

    with open(temporary_path, 'wb+') as temp_file:
        for chunk in file.file.open():
            temp_file.write(chunk)

    special_url = 'http://' + request.get_host() + settings.MEDIA_URL + temporary_filename
    return {
        'special_url': special_url
    }


def serve_download_file(request, pk):
    file = Files.objects.get(id=pk)
    
    download_url = 'http://' + request.get_host() + settings.MEDIA_URL + file.file.name
    return {
        'download_url': download_url,
        'filename': file.title
    }
