# Generated by Django 3.2.15 on 2023-03-20 08:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0008_alter_remindermodel_reminding_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='remindermodel',
            name='reminding_time',
            field=models.DateField(default=datetime.date(2023, 3, 20), verbose_name='reminding time'),
        ),
    ]
