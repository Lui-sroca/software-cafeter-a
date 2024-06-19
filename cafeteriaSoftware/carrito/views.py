from django.shortcuts import render
from adminInventario2.models import *
from django.contrib.auth.decorators import login_required

@login_required

def lista_productos(request):
    productos = Productos.objects.all()
    return render(request, 'productos.html', {'productos': productos})

