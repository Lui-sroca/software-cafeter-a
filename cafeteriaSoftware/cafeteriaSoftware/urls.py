from django.contrib import admin
from django.urls import path, include
from inicioSesion.views import *

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include('interfazInventario.urls')),
    path("carrito/", include('carrito.urls')),
    path("finanzas/", include('finanzas.urls') ),
    path("inventario/", include('adminInventario2.urls')),
    path("ordenes/", include('ordenes.urls')),
    path("accounts/", include('django.contrib.auth.urls')),
]
