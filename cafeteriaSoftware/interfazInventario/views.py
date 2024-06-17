from django.http import HttpResponse
from django.shortcuts import render
from adminInventario2.models import *
from django.contrib.auth.decorators import login_required


@login_required

def index(request):
    productos = Productos.objects.all()
    categoria = Categoria.objects.all()
    return render(request, 'index.html', {
        "productos":productos,
        "categorias":categoria
    })

def inventario(request):
    productos = Productos.objects.all()
    return render(request, 'inventario.html', {
        "productos":productos
    })
    
def productos(request):

    return render(request, 'productos.html')

def carrito(request):

    return render(request, 'carrito.html')


def finanzas(request):

    return render(request, 'finanzas.html')

def admin_interfaz(request):

    return render(request, 'admin.html')

def empleados(request):

    return render(request, 'empleado.html')

# Create your views here.
