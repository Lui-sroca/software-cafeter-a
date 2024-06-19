from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from adminInventario2.models import *
from django.shortcuts import render
from django.db.models import Count
import matplotlib

matplotlib.use("Agg")
from django.shortcuts import render
from django.views.generic import TemplateView
import json
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes

@csrf_exempt
def guardarVentas(request):
    if request.method == "POST":
        try:
            username = request.user.username
            # first_name = request.user.first_name
            # last_name = request.user.last_name
            # email = request.user.email

            # print(username, first_name, last_name, email)

            data = json.loads(request.body)
            fecha = data.get("fecha")
            cantidad = data.get("cantidad_productos")
            sub_precio = data.get("sub_precio")
            descuento = data.get("descuento")
            tipo_descuento = data.get("tipo_descuento")
            total_precio = data.get("total_precio")
            numero_orden = data.get("numero_orden")

            # Guardar los datos en la base de datos
            guardar_venta = Ventas(
                empleado=username,
                fecha_creacion=fecha,
                cantidad_productos=cantidad,
                sub_precio_venta=sub_precio,
                descuento=descuento,
                tipo_descuento=tipo_descuento,
                total_precio_venta=total_precio,
                numero_orden=numero_orden,  # Usar el número de orden proporcionado
            )

            guardar_venta.save()

            return JsonResponse(
                {
                    "mensaje": "Venta guardada correctamente",
                    "numero_orden": guardar_venta.numero_orden,
                }
            )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)


@csrf_exempt
def guardarDetallesV(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            numero_orden = data.get("pedidoNumero")
            nombre_cliente = data.get("nombreCliente")
            correo_cliente = data.get("correoCliente")
            pedido = data.get("pedido")
            cantidad_productos = data.get("cantidad_productos")

            # Obtener la venta correspondiente al número de orden
            venta = get_object_or_404(Ventas, numero_orden=int(numero_orden))

            # Crear un detalle de venta
            guardar_detalle = detalleVentas(
                numero_orden=venta.numero_orden,  # Aquí asignamos el número de orden, no el objeto completo
                nombre_cliente=nombre_cliente,
                correo_cliente=correo_cliente,
                pedido=pedido,
                cantidad_productos=cantidad_productos,
            )

            guardar_detalle.save()

            return JsonResponse({"mensaje": "Detalle de venta guardado correctamente"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Método no permitido"}, status=405)


class listar_finanzas(TemplateView):
    template_name = "finanzas.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        ventas = Ventas.objects.all()
        labels = [venta.numero_orden for venta in ventas]
        datos = [venta.total_precio_venta for venta in ventas]
        context["labels"] = labels
        context["datos"] = datos
        return context
