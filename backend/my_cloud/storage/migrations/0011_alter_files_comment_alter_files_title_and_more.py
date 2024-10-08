# Generated by Django 5.1 on 2024-09-27 20:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('storage', '0010_rename_image_files_file_alter_files_comment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='files',
            name='comment',
            field=models.CharField(default='', max_length=500),
        ),
        migrations.AlterField(
            model_name='files',
            name='title',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='files',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.SET_DEFAULT, related_name='files', to='storage.users'),
        ),
        migrations.AlterField(
            model_name='users',
            name='email',
            field=models.EmailField(max_length=254),
        ),
        migrations.AlterField(
            model_name='users',
            name='full_name',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='users',
            name='role',
            field=models.CharField(default='USER', max_length=100),
        ),
        migrations.AlterField(
            model_name='users',
            name='username',
            field=models.CharField(max_length=50),
        ),
    ]
