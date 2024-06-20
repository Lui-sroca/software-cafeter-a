from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from adminInventario2.models import *
import json
from django.contrib.auth.decorators import login_required


@csrf_exempt
def obtenerOrden(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            pedido = data.get("detalles")
            nombre = data.get("nombre")
            correo = data.get("correo")
            numero_pedido = data.get("pedido_numero")

            guardar_numero(numero_pedido)

            guardar_orden = Ordenes(
                numero=numero_pedido,
                nombre_cliente=nombre,
                correo_cliente=correo,
                detalles=json.dumps(pedido),
            )

            guardar_orden.save()

            return JsonResponse(
                {
                    "exito": "se paso la orden correctamente al back-end yiuju",
                    "data": data,
                }
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


@login_required

def actualizarOrden(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            pedido = data.get("carrito")
            numero_orden = data.get("idPedido")

            ordenes = Ordenes.objects.get(numero=numero_orden)

            ordenes.detalles = pedido

            ordenes.save()

            return JsonResponse(
                {
                    "exito": "se actualizo la orden correctamente al back-end yiuju",
                    "data": data,
                }
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


def cambiarEstadoP(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)

            numero_orden = data.get("numero_orden")

            ordenes = Ordenes.objects.get(numero=numero_orden)

            ordenes.estado = "Finalizado"

            ordenes.save()

            return JsonResponse(
                {
                    "exito": "se actualizo el estado de la orden correctamente al back-end yiuju",
                    "data": data,
                }
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


def guardar_numero(numero):

    numero_pedido = numero

    guardar_numero = numeroOrden(numero=numero_pedido)

    guardar_numero.save()


def listar_pedidos(request):
    # Filtrar las órdenes en el estado "En proceso"
    ordenes_en_proceso = Ordenes.objects.filter(estado="En proceso")
    
    return render(request, "pedidos.html", {"pedidos": ordenes_en_proceso})


def numeroOrdenes(request):
    if request.method == "POST":
        # No es necesario cargar el cuerpo de la solicitud para esta operación
        numero_de_ordenes = numeroOrden.objects.values_list("numero", flat=True)

        # Convertir los números de orden a una lista
        numeros_lista = list(numero_de_ordenes)

        data = {
            "numeros": numeros_lista,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
