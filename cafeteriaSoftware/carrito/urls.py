from django.urls import path, include
from .views import lista_productos


urlpatterns = [
    path("listar_productos/", lista_productos),
]
