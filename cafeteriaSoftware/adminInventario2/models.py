from django.db import models


# Create your models here.
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
    descuento = models.IntegerField()
    tipo_descuento = models.CharField(max_length=1000)
    total_precio_venta = models.IntegerField()


class numeroOrden(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.IntegerField()


class Ordenes(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.IntegerField()
    nombre_cliente = models.CharField(max_length=100)
    correo_cliente = models.EmailField()
    estado = models.CharField(default = "En proceso")
    detalles = models.TextField()
    fecha_creacion = models.DateField(auto_now_add=True)
