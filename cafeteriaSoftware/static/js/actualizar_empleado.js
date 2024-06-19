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

      fetch("/empleados/datosEnviados/", {
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
          const nombreUsuario = document.getElementById("username-actualizar");
          const nombres = document.getElementById("first_name-actualizar");
          const apellidos = document.getElementById("last_name-actualizar");
          const email = document.getElementById("email-actualizar");

          // Verificar si los elementos existen antes de asignarles valores
          if (id && nombreUsuario && nombres && apellidos && email) {
            id.value = data.id;
            nombreUsuario.value = data.nombreUsuario;
            nombres.value = data.nombres;
            apellidos.value = data.apellidos;
            email.value = data.correo;

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
  const nombreUsuario = document.getElementById("username-actualizar").value;
  const nombres = document.getElementById("first_name-actualizar").value;
  const apellidos = document.getElementById("last_name-actualizar").value;
  const email = document.getElementById("email-actualizar").value;

  const formData = {
    id: id,
    nombreUsuario: nombreUsuario,
    nombres: nombres,
    apellidos: apellidos,
    correo: email,
  };

  console.log("Datos a actualizar:", formData); // Debugging: Verificar los datos antes de enviarlos
  const csrftoken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  fetch("/empleados/actualizarDatos/", {
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
