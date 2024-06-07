function agregarAlCarrito(
  productoId,
  productoNombre,
  productoPrecio,
  productoCantidad
) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Verificar si el producto ya está en el carrito
  let productoExistente = carrito.find((item) => item.id === productoId);

  if (productoExistente) {
    var cantidad = productoExistente.cantidad;

    if (cantidad >= productoCantidad) {
      alert("cantidad maxima alcanzada");
    } else {
      productoExistente.cantidad += 1;
      alert("Producto agregado al carrito");
      console.log(productoCantidad);
    }
  } else {
    carrito.push({
      id: productoId,
      nombre: productoNombre,
      precio: productoPrecio,
      cantidad: 1,
      cantidadMaxima: productoCantidad,
    });

    console.log("Producto agregado");
  }

  // Guardar el carrito en localStorage después de agregar o actualizar un producto
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Mostrar el carrito actualizado
  mostrarCarrito();
}
