from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
<<<<<<< HEAD
from adminInventario2.models import *
=======
from .models import *
>>>>>>> 9f2a2a773688fb5a82b12142bdb20c2f9b383fbb
import json


@csrf_exempt
<<<<<<< HEAD
def obtenerOrden(request):
=======
def ordenRecibida(request):
>>>>>>> 9f2a2a773688fb5a82b12142bdb20c2f9b383fbb
    if request.method == "POST":
        try:
            data = json.loads(request.body)

<<<<<<< HEAD
            pedido = data.get("carrito")
            nombre = data.get("nombre")
            correo = data.get("correo")
            numero_pedido = int(data.get("numero"))
            
            guardar_numero(numero_pedido)


            guardar_orden = Ordenes(
                numero=numero_pedido,
                nombre_cliente=nombre,
                correo_cliente=correo,
                detalles=pedido,
            )

            guardar_orden.save()

            
            return JsonResponse(
                {
                    "exito": "se paso la orden correctamente al back-end yiuju",
                    "data": data,
                }
            )
=======
            return print(data)
>>>>>>> 9f2a2a773688fb5a82b12142bdb20c2f9b383fbb

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)
<<<<<<< HEAD


def guardar_numero(numero):
    
    numero_pedido = numero

    guardar_numero = numeroOrden(numero=numero_pedido)

    guardar_numero.save()


def listar_pedidos(request):
    ordenes = Ordenes.objects.all()
    return render(request, "pedidos.html", {"pedidos": ordenes})
=======
>>>>>>> 9f2a2a773688fb5a82b12142bdb20c2f9b383fbb
