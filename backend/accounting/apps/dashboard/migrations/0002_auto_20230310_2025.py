# Generated by Django 3.2.15 on 2023-03-10 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountmodel',
            name='tag',
            field=models.CharField(choices=[('food', 'food'), ('dress', 'dress'), ('bill', 'bill'), ('rent', 'rent'), ('leon', 'leon'), ('salary', 'salary'), ('cars and accessories', 'cars and accessories'), ('payment to other', 'payment to other'), ('service', 'service'), ('health', 'health'), ('other', 'other')], max_length=30, verbose_name='tag'),
        ),
        migrations.AlterField(
            model_name='accountmodel',
            name='typ',
            field=models.CharField(choices=[('input', 'input'), ('output', 'output')], max_length=10, verbose_name='type'),
        ),
        migrations.AlterField(
            model_name='remindermodel',
            name='account_type',
            field=models.CharField(choices=[('input', 'input'), ('output', 'output')], max_length=10, verbose_name='account type'),
        ),
        migrations.AlterField(
            model_name='remindermodel',
            name='reminder_type',
            field=models.CharField(choices=[('check', 'check'), ('debt', 'debt')], max_length=10, verbose_name='reminder type'),
        ),
        migrations.AlterField(
            model_name='remindermodel',
            name='time_choice',
            field=models.CharField(choices=[('one day before', 'one day before'), ('two day before', 'two day before'), ('three day before', 'three day before'), ('week before', 'week before'), ('month before', 'month before')], max_length=20, verbose_name='time choice'),
        ),
    ]
