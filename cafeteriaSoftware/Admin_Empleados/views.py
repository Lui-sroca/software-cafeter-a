from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import *
import json
from django.contrib.auth.decorators import login_required

@login_required

def administradores(request):
    # Filtrar usuarios que no son administradores
    admins = User.objects.filter(is_staff=True)

    return render(request, "admin_interfaz.html", {"admins": admins})


def eliminarAdministradores(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            admin_id = data.get("id")
            admin = User.objects.get(id=admin_id)
            admin.delete()
            return JsonResponse(
                {"mensaje": "admin eliminado correctamente"}, status=200
            )
        except User.DoesNotExist:
            return JsonResponse({"error": "El empleado no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def enviarDatosAdmin(request):
    if request.method == "POST":
        data = json.loads(request.body)
        admin_id = data.get("id")
        admin = User.objects.get(id=admin_id)

        # Aquí puedes construir el JSON con los datos del producto que deseas devolver
        data = {
            "id": admin.id,
            "nombreUsuario": admin.username,
            "nombres": admin.first_name,
            "apellidos": admin.last_name,
            "correo": admin.email,
           "contraseña": admin.password,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def actualizarDatosAdmin(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            empleado_id = data.get("id")
            nombreUsuario = data.get("nombreUsuario")
            nombres = data.get("nombres")
            apellidos = data.get("apellidos")
            correo = data.get("correo")

            # Obtener el producto existente
            admin = User.objects.get(id=empleado_id)

            # Actualizar los campos del producto
            admin.username = nombreUsuario
            admin.first_name = nombres
            admin.last_name = apellidos
            admin.email = correo

            # Guardar los cambios en la base de datos
            admin.save()

            return JsonResponse({"message": "administrador actualizado correctamente"})

        except User.DoesNotExist:
            return JsonResponse({"error": "Producto no encontrado"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)



def empleados(request):
    # Filtrar usuarios que no son administradores
    empleados = User.objects.filter(is_staff=False)

    return render(request, "empleado.html", {"empleados": empleados})


def eliminarEmpleados(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            empleado_id = data.get("id")
            empleado = User.objects.get(id=empleado_id)
            empleado.delete()
            return JsonResponse(
                {"mensaje": "Empleado eliminado correctamente"}, status=200
            )
        except User.DoesNotExist:
            return JsonResponse({"error": "El empleado no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def enviarDatos(request):
    if request.method == "POST":
        data = json.loads(request.body)
        empleado_id = data.get("id")
        empleado = User.objects.get(id=empleado_id)

        # Aquí puedes construir el JSON con los datos del producto que deseas devolver
        data = {
            "id": empleado.id,
            "nombreUsuario": empleado.username,
            "nombres": empleado.first_name,
            "apellidos": empleado.last_name,
            "correo": empleado.email,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def actualizarDatos(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            empleado_id = data.get("id")
            nombreUsuario = data.get("nombreUsuario")
            nombres = data.get("nombres")
            apellidos = data.get("apellidos")
            correo = data.get("correo")

            # Obtener el producto existente
            empleado = User.objects.get(id=empleado_id)

            # Actualizar los campos del producto
            empleado.username = nombreUsuario
            empleado.first_name = nombres
            empleado.last_name = apellidos
            empleado.email = correo

            # Guardar los cambios en la base de datos
            empleado.save()

            return JsonResponse({"message": "empleado actualizado correctamente"})

        except User.DoesNotExist:
            return JsonResponse({"error": "Producto no encontrado"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)
