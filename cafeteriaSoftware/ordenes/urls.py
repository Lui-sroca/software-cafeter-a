from django.urls import path
from .views import cambiarEstadoP, obtenerOrden, actualizarOrden, listar_pedidos, obtenerOrden, numeroOrdenes


urlpatterns = [
    path("cambiarEstadoP/", cambiarEstadoP),
    path("obtenerOrdenes/", obtenerOrden),
    path("actualizarOrdenes/", actualizarOrden),
    path("", listar_pedidos),
    path("recibirOrden/", obtenerOrden),
    path('obtenerNumerosOrden/', numeroOrdenes),
]
