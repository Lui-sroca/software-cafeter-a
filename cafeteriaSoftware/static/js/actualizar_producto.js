document.addEventListener("DOMContentLoaded", function () {
  const botonesActualizar = document.querySelectorAll(".actualizar-btn");
  const closeModalBtnActualizar = document.getElementById(
    "cerrarBtnActualizar"
  );
  const modal = document.getElementById("modal-actualizar");

  botonesActualizar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const productoId = boton.dataset.id;
      console.log("Producto ID:", productoId); // Debugging: Verificar si el ID del producto se obtiene correctamente

      fetch("/inventario/datosEnviados/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({ id: productoId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Datos recibidos:", data); // Debugging: Verificar si los datos se reciben correctamente

          modal.style.display = "flex";

          const id = document.getElementById("id-actualizar");
          const nombre = document.getElementById("nombre-actualizar");
          const descripcion = document.getElementById("descripcion-actualizar");
          const imagen = document.getElementById("imagen-actualizar");
          const precio = document.getElementById("precio-actualizar");
          const estado = document.getElementById("estado-actualizar");
          const cantidad = document.getElementById("cantidad-actualizar");
          const categoria = document.getElementById("categoria-actualizar");

          // Verificar si los elementos existen antes de asignarles valores
          if (
            id &&
            nombre &&
            descripcion &&
            imagen &&
            precio &&
            estado &&
            cantidad &&
            categoria
          ) {
            id.value = data.id;
            nombre.value = data.nombre;
            descripcion.value = data.descripcion;
            imagen.value = data.imagen;
            precio.value = data.precio;
            cantidad.value = data.cantidad;

            // Convertir el valor booleano a la opción adecuada del select
            estado.value = data.estado ? "activo" : "inactivo";
            if (data.categoria === "bebidas") {
              categoria.value = "1";
          } else if (data.categoria === "pasteles") {
              categoria.value = "2";
          } else if (data.categoria === "galletas") {
              categoria.value = "3";
          } else {
              categoria.value = "4";
          }
          

            console.log("Datos del producto asignados a los inputs");
          } else {
            console.error(
              "Uno o más elementos no fueron encontrados en el DOM"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });

  closeModalBtnActualizar.addEventListener("click", function () {
    modal.style.display = "none";
  });

  const actualizarProductoBtn = document.getElementById("ActualizarBtn");
  actualizarProductoBtn.addEventListener("click", actualizarProducto);
});

function actualizarProducto() {
  const id = document.getElementById("id-actualizar").value;
  const nombre = document.getElementById("nombre-actualizar").value;
  const descripcion = document.getElementById("descripcion-actualizar").value;
  const imagen = document.getElementById("imagen-actualizar").value;
  const precio = document.getElementById("precio-actualizar").value;
  const estado = document.getElementById("estado-actualizar").value;
  const cantidad = document.getElementById("cantidad-actualizar").value;
  const categoria = document.getElementById("categoria-actualizar").value;

  const formData = {
    id: id,
    nombre: nombre,
    descripcion: descripcion,
    imagen: imagen,
    precio: precio,
    estado: estado === "activo", // Convertir a booleano antes de enviar
    cantidad: cantidad,
    categoria: categoria,
  };

  console.log("Datos a actualizar:", formData); // Debugging: Verificar los datos antes de enviarlos
  const csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  fetch("/inventario/datosActualizados/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Éxito:", data);
      document.getElementById("modal-actualizar").style.display = "none";
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
