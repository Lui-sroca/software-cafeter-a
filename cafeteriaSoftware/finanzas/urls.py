
from django.urls import path, include
from .views import guardarVentas, guardarDetallesV, listar_finanzas


urlpatterns = [
    path("", listar_finanzas.as_view() ),
    path("guardarVentas/", guardarVentas),
    path("guardarDetallesV/", guardarDetallesV),
]
