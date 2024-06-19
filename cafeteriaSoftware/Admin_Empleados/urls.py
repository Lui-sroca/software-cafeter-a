# inicio_sesion/urls.py
from django.urls import path
from .views import *

urlpatterns = [
    path('empleados/', empleados, name='empleados'),
    path('eliminarEmpleados/', eliminarEmpleados),
    path('datosEnviados/', enviarDatos),
    path('actualizarDatos/', actualizarDatos),
    
    path('administrador/',administradores ),
    path('eliminarEmpleadosAdmin/', eliminarAdministradores),
    path('datosEnviadosAdmin/', enviarDatosAdmin),
    path('actualizarDatosAdmin/', actualizarDatosAdmin),
]
