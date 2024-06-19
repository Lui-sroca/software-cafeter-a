# inicio_sesion/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('', empleados, name='empleados'),
    path('eliminarEmpleados/', eliminarEmpleados),
    path('datosEnviados/', enviarDatos),
    path('actualizarDatos/', actualizarDatos),
]
