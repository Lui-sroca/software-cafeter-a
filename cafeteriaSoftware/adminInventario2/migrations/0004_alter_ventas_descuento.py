# Generated by Django 5.0.6 on 2024-06-19 14:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminInventario2', '0003_alter_ventas_numero_orden'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ventas',
            name='descuento',
            field=models.DecimalField(decimal_places=5, max_digits=5),
        ),
    ]
