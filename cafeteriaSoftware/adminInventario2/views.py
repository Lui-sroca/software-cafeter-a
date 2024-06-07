from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import *
import json


@csrf_exempt
def guardarDatos(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            nombre = data.get("nombre")
            descripcion = data.get("descripcion")
            imagen = data.get("imagen")
            precio = data.get("precio")
            estado = data.get("estado")
            cantidad = data.get("cantidad")
            categoria = int(data.get("categoria"))
            categoria_instance = Categoria.objects.get(pk=categoria)
            # Aquí puedes agregar la lógica para guardar los datos en la base de datos

            guardar_producto = Productos(
                nombre=nombre,
                descripcion=descripcion,
                imagen=imagen,
                precio=precio,
                estado=estado,
                cantidad=cantidad,
                categoria = categoria_instance,
            )

            guardar_producto.save()

            return print("guardado en la base de datos")

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


def enviarDatos(request):
    if request.method == "POST":
        data = json.loads(request.body)
        producto_id = data.get("id")
        producto = Productos.objects.get(id=producto_id)
        categoria = producto.categoria  # Obtener la categoría del producto
        
        # Aquí puedes construir el JSON con los datos del producto que deseas devolver
        data = {
            "id": producto.id,
            "nombre": producto.nombre,
            "descripcion": producto.descripcion,
            "imagen": producto.imagen,
            "precio": producto.precio,
            "estado": producto.estado,
            "cantidad": producto.cantidad,
            "categoria": categoria.categoria_producto,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)


def actualizarDatos(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            producto_id = data.get("id")
            nombre = data.get("nombre")
            descripcion = data.get("descripcion")
            imagen = data.get("imagen")
            precio = data.get("precio")
            estado = data.get("estado")
            cantidad = data.get("cantidad")
            categoria = int(data.get("categoria"))
            categoria_instance = Categoria.objects.get(pk=categoria)

            # Obtener el producto existente
            producto = Productos.objects.get(id=producto_id)

            # Actualizar los campos del producto
            producto.nombre = nombre
            producto.descripcion = descripcion
            producto.imagen = imagen
            producto.precio = precio
            producto.estado = estado
            producto.cantidad = cantidad
            producto.categoria = categoria_instance

            # Guardar los cambios en la base de datos
            producto.save()

            return JsonResponse({"message": "Producto actualizado correctamente"})

        except Productos.DoesNotExist:
            return JsonResponse({"error": "Producto no encontrado"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)

def eliminarProducto(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            producto_id = data.get("id")
            producto = Productos.objects.get(id=producto_id)
            producto.delete()
            return JsonResponse({"mensaje": "Producto eliminado correctamente"}, status=200)
        except Productos.DoesNotExist:
            return JsonResponse({"error": "El producto no existe"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)