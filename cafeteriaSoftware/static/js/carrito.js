async function obtenerNumeroOrdenes() {
  try {
    const response = await fetch("/obtenerNumerosOrden/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify("pedido de numeros"),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Datos recibidos:", data); // Debugging: Verificar si los datos se reciben correctamente

    if (Array.isArray(data.numeros)) {
      const numerosExistentes = data.numeros;
      const nuevoNumero = generarNumeroUnico(numerosExistentes);
      console.log("Nuevo número de orden:", nuevoNumero);
      return nuevoNumero; // Retornar el nuevo número de orden
    } else {
      console.error(
        "La respuesta del servidor no contiene un array de números:",
        data
      );
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function generarNumeroUnico(numerosExistentes) {
  let nuevoNumero;
  do {
    nuevoNumero = Math.floor(Math.random() * 1000000).toString(); // Genera un número aleatorio de 6 dígitos
  } while (numerosExistentes.includes(nuevoNumero));
  return nuevoNumero;
}

async function nuevaOrden() {
  // Generar un nuevo número de orden único
  const numeroOrden = await obtenerNumeroOrdenes(); // Usar await para esperar la respuesta
  

  // Crear una nueva orden vacía en el localStorage
  const nuevaOrden = {
    numero: numeroOrden,
    nombre: "", // Asigna los valores correspondientes
    correo: "",
    carrito: []
  };

  localStorage.setItem(`pedido_${numeroOrden}`, JSON.stringify(nuevaOrden));
  localStorage.setItem("numeroPedido", numeroOrden);

  let carrito = JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`));

  console.log("Datos que se enviarán al servidor:", carrito);

  fetch("/obtenerOrdenes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"), // Añadir el token CSRF para la seguridad
    },
    body: JSON.stringify(carrito), // Enviar el objeto que contiene la orden
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Orden guardada:", data);
    alert("Orden realizada con éxito.");
    alert(
      "Se puede acercar a caja, su número del pedido es: " + numeroOrden
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });

  console.log(carrito);
  console.log(numeroOrden);
}


// Redirigir a la página del carrito con el nuevo número de orden
// window.location.href = `/carrito/${numeroOrden}/`;

function agregarAlCarrito(productoId, productoNombre, productoPrecio, productoCantidad) {
  // Obtener el número del pedido actual
  const numeroOrden = localStorage.getItem("numeroPedido");

  if (!numeroOrden) {
    alert("Primero debe crear una nueva orden.");
    return;
  }

  // Obtener el carrito actual desde el almacenamiento local
  let carrito = JSON.parse(localStorage.getItem(`pedido_${numeroOrden}`)) || [];

  // Verificar si el carrito tiene un pedido válido y si no, inicializarlo
  if (carrito.length === 0) {
    carrito.push({
      pedido_numero: numeroOrden,
      nombre_cliente: "", // Asigna los valores correspondientes
      correo_cliente: "",
      estado: "En proceso",
      detalles: [],
    });
  }

  // Obtener los detalles del pedido
  let detalles = carrito[0].detalles;

  // Verificar si el producto ya está en los detalles del pedido
  let productoExistente = detalles.find((item) => item.id === productoId);

  if (productoExistente) {
    var cantidad = productoExistente.cantidad;

    if (cantidad >= productoCantidad) {
      alert("Cantidad máxima alcanzada");
    } else {
      productoExistente.cantidad += 1;
      alert("Producto agregado al carrito");
      console.log(productoCantidad);
      console.log(carrito);
    }
  } else {
    detalles.push({
      id: productoId,
      nombre: productoNombre,
      precio: productoPrecio,
      cantidad: 1,
      cantidadMaxima: productoCantidad,
    });


  }

  console.log("Producto agregado");
  console.log(carrito[0].detalles);


  let carritoActual = carrito[0].detalles
  let idPedido = carrito[0].id
  actualizarPedido(carritoActual, idPedido)

  // Guardar el carrito en localStorage después de agregar o actualizar un producto
  localStorage.setItem(`pedido_${numeroOrden}`, JSON.stringify(carrito));


};

  // Mostrar el carrito actualizado


function actualizarPedido(carrito, id){

  datosActualizar = {
    carrito : carrito,
    idPedido : id,
  }

  fetch("/actualizarOrdenes/", {
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
