window.onload = function () {
  // Escuchar el evento personalizado cuando se agrega un producto al carrito
  document.addEventListener("productoAgregado", function () {
    // Mostrar el carrito actualizado
    mostrarCarrito();
  });

  // Mostrar el carrito al cargar la página
  mostrarCarrito();
};


function mostrarCarrito() {
  // Obtener el número de pedido desde localStorage
  const numeroOrden = localStorage.getItem("numeroPedido");

  // Validar si es un número válido (opcional)
  if (numeroOrden && !isNaN(numeroOrden)) {
    console.log("Número de pedido:", numeroOrden);
    let carrito =
      JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];
    let carritoHtml = "";
    let precioTotal = [];
    let inputPrecioTotal = document.getElementById("precio-total");

    carrito.forEach((item, index) => {
      item.detalles.forEach((detalle, detalleIndex) => {
        console.log("Nombre del producto:", detalle.nombre);
        let preciosubTotal = detalle.precio * detalle.cantidad;
        precioTotal.push(preciosubTotal);
        carritoHtml += `
            <tr>
                <td>${detalle.nombre}</td>
                <td>
                    <button class="btn-quantity" onclick="cambiarCantidad(${index}, ${detalleIndex}, -1, ${
          detalle.cantidadMaxima
        })" ${detalle.cantidad <= 1 ? "disabled" : ""}>-</button>
                    ${detalle.cantidad}
                    <button class="btn-quantity" onclick="cambiarCantidad(${index}, ${detalleIndex}, 1, ${
          detalle.cantidadMaxima
        })">+</button>
                </td>
                <td>$${detalle.precio.toFixed(2)}</td>
                <td>$${preciosubTotal.toFixed(2)}</td>
                <td><button class="btn-delete" onclick="eliminarItem(${index}, ${detalleIndex})">Eliminar</button></td>
            </tr>
        `;
      });
    });

    const sumaTotal = precioTotal.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      0
    );
    inputPrecioTotal.value = sumaTotal;

    let carritoElement = document.querySelector("#carrito tbody");
    if (carritoElement) {
      carritoElement.innerHTML = carritoHtml;
    } else {
      console.error('El elemento con id "carrito" no existe en el DOM.');
    }
  } else {
    console.error("Número de pedido no válido o no encontrado en localStorage");
  }
}

function cambiarCantidad(index, detalleIndex, delta, cantidadMaxima) {
  const numeroOrden = localStorage.getItem("numeroPedido");
  let carrito = JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];
  if (carrito[index].detalles[detalleIndex]) {
    let detalle = carrito[index].detalles[detalleIndex];
    if (detalle.cantidad < 1) {
      detalle.cantidad = 1; // Evitar cantidades menores a 1
    }
    if (
      detalle.cantidad + delta <= cantidadMaxima &&
      detalle.cantidad + delta >= 1
    ) {
      detalle.cantidad += delta;
    } else if (detalle.cantidad + delta > cantidadMaxima) {
      alert("¡Cantidad límite alcanzada!");
    }
    localStorage.setItem(`pedido_${numeroOrden}`, JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar la visualización del carrito
  }
}

function eliminarItem(index, detalleIndex) {
  const numeroOrden = localStorage.getItem("numeroPedido");
  let carrito = JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];
  if (carrito[index].detalles[detalleIndex]) {
    carrito[index].detalles.splice(detalleIndex, 1); // Eliminar el detalle del carrito
    localStorage.setItem(`pedido_${numeroOrden}`, JSON.stringify(carrito));
    mostrarCarrito(); // Actualizar la visualización del carrito
  }
}

let botonPagar = document.getElementById("boton-pagar");

botonPagar.addEventListener("click", function () {
  let inputPrecioTotal = parseFloat(
    document.getElementById("precio-total").value
  );
  let dineroRecibido = parseFloat(
    document.getElementById("dinero-recibido").value
  );
  let inputVuelto = document.getElementById("vuelto-cliente");

  // Verificar si se ha ingresado una cantidad de dinero recibida
  if (isNaN(dineroRecibido)) {
    alert("Por favor, ingrese una cantidad de dinero recibida.");
    inputVuelto.value = "";
    return; // Salir de la función si no se ha ingresado dinero
  }

  // Verificar si el dinero recibido es menor que el precio total
  if (dineroRecibido < inputPrecioTotal) {
    alert(
      "El dinero recibido es menor que el precio total. Por favor, ingrese una cantidad suficiente."
    );
    inputVuelto.value = "";
    return; // Salir de la función si el dinero es insuficiente
  }

  // Confirmar la venta
  let confirmarVenta = confirm("¿Está seguro de que desea realizar la venta?");
  if (confirmarVenta) {
    const selectElement = document.getElementById("descuentoSelect");
    const selectedOption = selectElement.options[selectElement.selectedIndex];

    console.log(`Valor seleccionado: ${selectedOption.value}`);

    let descuento = 0;
    let tipoDescuento = "";

    if (selectedOption.value == "1") {
      descuento = 0.08; // 8% de descuento
      tipoDescuento = "estudiante";
    } else if (selectedOption.value == "2") {
      descuento = 0.15; // 15% de descuento
      tipoDescuento = "profesor";
    }

    // Calcular el precio con descuento
    let precioConDescuento = inputPrecioTotal * (1 - descuento);

    // Calcular el vuelto sin aplicar el descuento
    let vueltoSinDescuento = dineroRecibido - inputPrecioTotal;

    // Calcular el descuento en el vuelto
    let descuentoEnVuelto = vueltoSinDescuento * descuento;

    // Calcular el vuelto con el descuento aplicado
    let vueltoConDescuento = vueltoSinDescuento - descuentoEnVuelto;

    inputVuelto.value = vueltoConDescuento.toFixed(2);

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadProductos = carrito.length;
    const fecha = obtenerFechaActual();

    const formData = {
      fecha: fecha,
      cantidad_productos: cantidadProductos,
      sub_precio: precioConDescuento,
      descuento: descuento,
      tipo_descuento: tipoDescuento,
      total_precio: vueltoConDescuento,
    };

    fetch("/guardarVentas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Añadir el token CSRF para la seguridad
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ventaGuardada:", data);
        alert("Venta realizada con éxito.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    inputVuelto.value = "";
    alert("Venta cancelada.");
  }
});

function obtenerFechaActual() {
  const fechaActual = new Date();

  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, así que sumamos 1
  const day = String(fechaActual.getDate()).padStart(2, "0");
  const hours = String(fechaActual.getHours()).padStart(2, "0");
  const minutes = String(fechaActual.getMinutes()).padStart(2, "0");
  const seconds = String(fechaActual.getSeconds()).padStart(2, "0");

  const fechaFormateada = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  const soloFechaFormateada = `${year}-${month}-${day}`;

  return soloFechaFormateada;
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
