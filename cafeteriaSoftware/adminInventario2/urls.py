from django.urls import path
from .views import guardarDatos, enviarDatos, actualizarDatos, eliminarProducto


urlpatterns = [
    path("datosGuardados/", guardarDatos),
    path("datosEnviados/", enviarDatos),
    path("datosActualizados/", actualizarDatos),
    path("datosEliminados/", eliminarProducto),
]
