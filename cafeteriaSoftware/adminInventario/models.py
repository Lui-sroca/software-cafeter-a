from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, Group, Permission



class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    categoria_producto = models.CharField(max_length=1000)


class Productos(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=1000)
    descripcion = models.TextField(blank=True)
    imagen = models.CharField(max_length=1000)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField()
    cantidad = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)


class Ventas(models.Model):
    id = models.AutoField(primary_key=True)
    empleado = models.CharField(max_length=1000)
    fecha_creacion = models.DateField(auto_now_add=True)
    cantidad_productos = models.IntegerField()
    sub_precio_venta = models.IntegerField()
    descuento = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_descuento = models.CharField(max_length=1000)
    total_precio_venta = models.IntegerField()
    numero_orden = models.IntegerField()  # Clave única

class detalleVentas(models.Model):
    id = models.AutoField(primary_key=True)
    numero_orden = models.IntegerField()  # Número de orden compartido
    nombre_cliente = models.CharField(max_length=1000)
    correo_cliente = models.CharField(max_length=1000)
    pedido = models.TextField(blank=True, null=True)
    cantidad_productos = models.IntegerField()

class numeroOrden(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.IntegerField()


class Ordenes(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.IntegerField()
    nombre_cliente = models.CharField(max_length=100)
    correo_cliente = models.EmailField()
    estado = models.CharField(default="En proceso")
    detalles = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateField(auto_now_add=True)


