from django.shortcuts import render
from adminInventario2.models import *

def lista_productos(request):
    productos = Productos.objects.all()
    return render(request, 'productos.html', {'productos': productos})

