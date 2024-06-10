# Generated by Django 5.0.6 on 2024-06-09 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminInventario2', '0004_ventas_tipo_descuento'),
    ]

    operations = [
        migrations.CreateModel(
            name='numeroOrden',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Ordenes',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('numero', models.IntegerField()),
                ('nombre_cliente', models.CharField(max_length=100)),
                ('correo_cliente', models.EmailField(max_length=254)),
                ('estado', models.CharField(default='En proceso')),
                ('detalles', models.TextField(blank=True, null=True)),
                ('fecha_creacion', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
