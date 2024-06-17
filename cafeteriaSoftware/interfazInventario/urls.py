from django.contrib import admin
from django.urls import path, include
from .views import index, inventario, carrito, admin_interfaz, empleados

urlpatterns = [
    path("", index),
    path("inventario/", inventario, name="inventario"),
    path("carrito/", carrito, name="carrito"),
    path("admin_interfaz/", admin_interfaz),
    path("empleados/", empleados),
]
