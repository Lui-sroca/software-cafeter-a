
from django.urls import path, include
from .views import guardarVentas, guardarDetallesV, finanzas_view, generar_reporte_excel


urlpatterns = [
    path("", finanzas_view ),
    path("guardarVentas/", guardarVentas),
    path("guardarDetallesV/", guardarDetallesV),
    path('reporte_excel/', generar_reporte_excel, name='generar_reporte_excel')
]
