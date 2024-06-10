function agregarNuevaOrden(
  pedidoId,
  pedidoNumero,
  pedidoNombre_cliente,
  pedidoCorreo_cliente,
  pedidoEstado,
  pedidoDetalles
) {
  let nombrePedido = "pedido_" + pedidoNumero;

  // Obtener el pedido desde localStorage
  let pedido = JSON.parse(localStorage.getItem(nombrePedido)) || [];

  // Si el pedido no es un array o está vacío, inicializarlo correctamente
  if (!Array.isArray(pedido) || pedido.length === 0) {
    pedido = [
      {
        id: pedidoId,
        nombre_cliente: pedidoNombre_cliente,
        correo_cliente: pedidoCorreo_cliente,
        estado: pedidoEstado,
        pedido_numero: pedidoNumero,
        detalles: [],
      },
    ];
  }

  // Verificar si el producto ya está en el pedido
  let detalles = pedido[0].detalles; // Asegurarse de acceder a la propiedad 'detalles' del primer objeto
  let productoExistente = detalles.find((item) => item.id === pedidoId);

  if (productoExistente) {
    productoExistente.cantidad += 1; // Incrementar la cantidad del producto existente
    alert("Producto agregado al pedido");
  } else {
    // Reemplazar los caracteres '\u0022' por comillas dobles
    pedidoDetalles = pedidoDetalles.replace(/\\u0022/g, '"');

    let detallesObjeto;

    try {
      // Intentar analizar la cadena como JSON
      detallesObjeto = JSON.parse(pedidoDetalles);
    } catch (error) {
      console.error("Error al analizar la cadena JSON:", error);
      // Manejar el error, mostrar un mensaje de error, etc.
      return;
    }

    detallesObjeto.forEach((detalle) => {
      detalles.push(detalle);
    });

    console.log("Producto agregado");
  }

  // Guardar el pedido en localStorage después de agregar o actualizar un producto
  localStorage.setItem(nombrePedido, JSON.stringify(pedido));

  // Mantener una lista de claves de pedidos
  let pedidosClaves = JSON.parse(localStorage.getItem("pedidosClaves")) || [];
  if (!pedidosClaves.includes(nombrePedido)) {
    pedidosClaves.push(nombrePedido);
    localStorage.setItem("pedidosClaves", JSON.stringify(pedidosClaves));
  }

  // Mostrar el carrito actualizado
  redirigirACarrito(pedidoNumero);
}

function redirigirACarrito(pedidoNumero) {
  // Guardar el número de pedido en localStorage
  localStorage.setItem("numeroPedido", pedidoNumero);

  // Redirigir a la página del carrito sin el número de pedido en la URL
  window.location.href = "/carrito/";
}
