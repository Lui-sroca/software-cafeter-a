# Generated by Django 5.0.6 on 2024-06-11 01:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminInventario2', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalleventas',
            name='numero_orden',
            field=models.IntegerField(),
        ),
    ]
