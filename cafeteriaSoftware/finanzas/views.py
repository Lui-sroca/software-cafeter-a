from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from adminInventario2.models import *
import json


@csrf_exempt
def guardarVentas(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            fecha = data.get("fecha")
            cantidad = data.get("cantidad_productos")
            sub_precio = data.get("sub_precio")
            descuento = data.get("descuento")
            tipo_descuento = data.get("tipo_descuento")
            total_precio = data.get("total_precio")

            # Aquí puedes agregar la lógica para guardar los datos en la base de datos

            guardar_venta = Ventas(
                fecha_creacion=fecha,
                cantidad_productos=cantidad,
                sub_precio_venta=sub_precio,
                descuento=descuento,
                tipo_descuento=tipo_descuento,
                total_precio_venta=total_precio,
            )

            guardar_venta.save()

            return JsonResponse({"mensaje": "Venta guardada correctamente"})

        except json.JSONDecodeError:
            return JsonResponse({"error": "Error al procesar el JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Método no permitido"}, status=405)
