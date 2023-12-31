# Generated by Django 3.2.15 on 2023-03-10 07:58

import apps.share.validators.user
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('username', models.CharField(error_messages={'unique': 'Sorry, this username already token.'}, max_length=150, unique=True, validators=[apps.share.validators.user.UsernameValidator()], verbose_name='Username')),
                ('first_name', models.CharField(max_length=128, verbose_name='First name')),
                ('last_name', models.CharField(max_length=256, verbose_name='Last name')),
                ('national_code', models.CharField(blank=True, max_length=10, null=True, validators=[apps.share.validators.user.NationalCodeValidator()], verbose_name='National code')),
                ('birthday', models.DateField(blank=True, null=True, verbose_name='Birthday')),
                ('sex', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default='Male', max_length=6, verbose_name='Sex')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='Superuser')),
                ('is_active', models.BooleanField(default=True, verbose_name='Active')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='Last login')),
                ('updated_at', models.DateTimeField(blank=True, null=True, verbose_name='Last update')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
        ),
        migrations.CreateModel(
            name='UserPhoneModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('phone', models.CharField(max_length=11, validators=[apps.share.validators.user.PhoneValidator()], verbose_name='Phone')),
                ('is_default', models.BooleanField(default=False, verbose_name='Default')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='phones', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserMobileModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('mobile', models.CharField(max_length=11, validators=[apps.share.validators.user.PhoneValidator()], verbose_name='Mobile')),
                ('is_default', models.BooleanField(default=False, verbose_name='Default')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mobiles', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserEmailModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('email', models.EmailField(max_length=254, verbose_name='Email')),
                ('is_default', models.BooleanField(default=False, verbose_name='Default')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='emails', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserAddressModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('address', models.TextField(verbose_name='Address')),
                ('is_default', models.BooleanField(default=False, verbose_name='Default')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL, verbose_name='User')),
            ],
            options={
                'ordering': ('-created_at',),
                'abstract': False,
            },
        ),
    ]
