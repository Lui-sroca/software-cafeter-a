from django.shortcuts import render, redirect
from adminInventario2.models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .form_registro import formularioRegistroUsuario
from django.contrib.auth.decorators import login_required


@login_required
def registroEmpleado(request):
    if request.method == "POST":
        form = formularioRegistroUsuario(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get("username")
            messages.success(
                request, f"Usuario {username} se registró correctamente "
            )

            return redirect("/usuarios/empleados/")

    else:
        form = formularioRegistroUsuario()
        print("error")

    context = {"form": form}
    return render(request, "registro/registro_empleado.html", context)



def registroAdmin(request):
    if request.method == "POST":
        form = formularioRegistroUsuario(request.POST)
        if form.is_valid():
            # Guardar el usuario sin confirmar (commit=False) para poder modificarlo antes de guardarlo definitivamente
            user = form.save(commit=False)
            user.is_staff = True  # Establecer is_staff en True
            user.save()  # Guardar el usuario con is_staff=True

            username = form.cleaned_data.get("username")
            messages.success(
                request, f"Usuario {username} se registró correctamente como administrador"
            )

            return redirect("/usuarios/administrador/")
        else:
            print("Formulario no válido")
    else:
        form = formularioRegistroUsuario()

    context = {"form": form}
    return render(request, "registro/registro_admin.html", context)