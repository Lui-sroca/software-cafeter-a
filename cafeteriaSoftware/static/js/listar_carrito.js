window.onload = function () {
  // Escuchar el evento personalizado cuando se agrega un producto al carrito
  document.addEventListener("productoAgregado", function () {
    mostrarCarrito();
  });

  // Mostrar el carrito al cargar la página
  mostrarCarrito();
};

function mostrarCarrito() {
  // Limpiar los campos de entrada
  const inputDineroRecibido = document.getElementById("dinero-recibido");
  const inputVuelto = document.getElementById("vuelto-cliente");
  inputDineroRecibido.value = ""; // Limpiar el campo de dinero recibido
  inputVuelto.value = ""; // Limpiar el campo de vuelto

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
                    <button class="btn-quantity" onclick="cambiarCantidad(${index}, ${detalleIndex}, -1, ${detalle.cantidadMaxima
          })" ${detalle.cantidad <= 1 ? "disabled" : ""}>-</button>
                    ${detalle.cantidad}
                    <button class="btn-quantity" onclick="cambiarCantidad(${index}, ${detalleIndex}, 1, ${detalle.cantidadMaxima
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

    let carritoActual = carrito[0].detalles;
    let idPedido = carrito[0].pedido_numero;
    actualizarPedido(carritoActual, idPedido);

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
    console.log(precioConDescuento)
    console.log(descuento)

    // // Calcular el vuelto sin aplicar el descuento
    let vueltoSinDescuento = dineroRecibido - precioConDescuento;

    console.log(vueltoSinDescuento)

    inputVuelto.value = vueltoSinDescuento;

    const numeroOrden = localStorage.getItem("numeroPedido");
    const carrito =
      JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];
    const cantidadProductos = carrito.length;
    const fecha = obtenerFechaActual();

    const formData = {
      fecha: fecha,
      cantidad_productos: cantidadProductos,
      sub_precio: inputPrecioTotal,
      descuento: descuento,
      tipo_descuento: tipoDescuento,
      total_precio: precioConDescuento,
      numero_orden: numeroOrden,
    };

    fetch("/finanzas/guardarVentas/", {
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
        // Guardar detalles de venta y eliminar pedido después de confirmar la venta
        guardarDetallesV();
        // eliminarPedidoCarrito();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    datosCambio = {
      numero_orden: numeroOrden,
    };

    fetch("/ordenes/cambiarEstadoP/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Añadir el token CSRF para la seguridad
      },
      body: JSON.stringify(datosCambio),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("ventaGuardada:", data);
        alert("Venta realizada con éxito.");
        // Guardar detalles de venta y eliminar pedido después de confirmar la venta
        guardarDetallesV();
        eliminarPedidoCarrito();

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    inputVuelto.value = "";
    alert("Venta cancelada.");
  }
});

function guardarDetallesV() {
  const numeroOrden = localStorage.getItem("numeroPedido");
  let carrito = JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];

  console.log(carrito[0].detalles)

  // Verificar si carrito[0] tiene las propiedades esperadas

  const nombreCliente = carrito[0].nombre;
  const correoCliente = carrito[0].correo;
  const pedidoNumero = carrito[0].pedido_numero;
  const cantidad = carrito[0].detalles.length

  const formData = {
    nombreCliente: nombreCliente,
    correoCliente: correoCliente,
    pedidoNumero: pedidoNumero,
    cantidad_productos : cantidad,
    pedido: carrito[0].detalles,
  };



  console.log(formData)

  try {
    fetch("/finanzas/guardarDetallesV/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), // Añadir el token CSRF para la seguridad
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Éxito:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  catch {
    alert("no funciono")
  }
}

function eliminarPedidoCarrito() {
  const numeroOrden = localStorage.getItem("numeroPedido");
  localStorage.removeItem(`pedido_${numeroOrden}`);

  if (localStorage.getItem(`pedido_${numeroOrden}`) === null) {
    console.log("El carrito ha sido eliminado correctamente.");
    localStorage.setItem("numeroPedido", "");
    location.reload(); // Recargar la página después de eliminar el carrito
  } else {
    console.log("El carrito aún existe.");
  }
}

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

function actualizarPedido(carrito, id) {
  datosActualizar = {
    carrito: carrito,
    idPedido: id,
  };

  fetch("/ordenes/actualizarOrdenes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"), // Añadir el token CSRF para la seguridad
    },
    body: JSON.stringify(datosActualizar),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("carritoActualizado:", data);
      alert("actualizado con éxito.");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
