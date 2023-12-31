# Generated by Django 3.2.15 on 2023-03-21 07:47

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0009_alter_remindermodel_reminding_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountmodel',
            name='is_draft',
            field=models.BooleanField(default=False, verbose_name='is draft'),
        ),
        migrations.AlterField(
            model_name='remindermodel',
            name='reminding_time',
            field=models.DateField(default=datetime.date(2023, 3, 21), verbose_name='reminding time'),
        ),
    ]
