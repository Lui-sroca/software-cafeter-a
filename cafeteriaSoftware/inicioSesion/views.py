from django.shortcuts import render, redirect
from adminInventario2.models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .form_registro import formularioRegistroUsuario
from django.contrib.auth.decorators import login_required

@login_required



def registro(request):
    if request.method == "POST":
        form = formularioRegistroUsuario(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get("username")
            cedula = form.cleaned_data.get("cedula")
            messages.success(
                request, f"Usuario {username} se registró correctamente {cedula}"
            )
            
            return redirect("inicio")

    else:
        form = formularioRegistroUsuario()
        print("error")

    context = {"form": form}
    return render(request, "registro/registrarse.html", context)


