"""
URL configuration for cafeteriaSoftware project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from interfazInventario.views import *
from adminInventario2.views import *
from inicioSesion.views import *
from carrito.views import *
from finanzas.views import *
from ordenes.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("inicio/", index),
    path("inventario/", inventario, name='inventario' ),
    path("productos/", lista_productos),
    path("carrito/", carrito),
    path("finanzas/", finanzas),
    path("admin_interfaz/", admin_interfaz),
    path("empleados/", empleados),
    path("datosGuardados/", guardarDatos),
    path("datosEnviados/", enviarDatos),
    path("datosActualizados/", actualizarDatos),
    path("datosEliminados/", eliminarProducto),
    path("guardarVentas/", guardarVentas),
<<<<<<< HEAD
    path("obtenerOrdenes/", obtenerOrden),
    path("listarPedido/", listar_pedidos),
=======
    path("recibirOrden/", ordenRecibida),
>>>>>>> 9f2a2a773688fb5a82b12142bdb20c2f9b383fbb
    path('', CustomLoginView.as_view(), name='login'),
]
