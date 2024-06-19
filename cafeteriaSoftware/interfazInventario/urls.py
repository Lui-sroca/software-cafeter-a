from django.contrib import admin
from django.urls import path, include
from .views import index, inventario, carrito, admin_interfaz, empleados

urlpatterns = [
    path("", index, name= "index"),
    path("inventario/", inventario, name="inventario"),
    path("carrito/", carrito, name="carrito"),
]
