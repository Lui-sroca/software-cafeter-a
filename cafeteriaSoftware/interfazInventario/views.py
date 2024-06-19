from django.shortcuts import render
from adminInventario2.models import *
from django.contrib.auth.decorators import login_required


def index(request):

    if request.user.is_authenticated:

        productos = Productos.objects.all()
        categoria = Categoria.objects.all()

        # username = request.user.username
        # first_name = request.user.first_name
        # last_name = request.user.last_name
        # email = request.user.email

        # print(username, first_name, last_name, email)

    return render(
        request, "index.html", {"productos": productos, "categorias": categoria}
    )


def inventario(request):
    productos = Productos.objects.all()
    return render(request, "inventario.html", {"productos": productos})


def productos(request):

    return render(request, "productos.html")


def carrito(request):

    return render(request, "carrito.html")


def finanzas(request):

    return render(request, "finanzas.html")


def admin_interfaz(request):

    return render(request, "admin.html")


def empleados(request):

    return render(request, "empleado.html")


# Create your views here.
