document.addEventListener("DOMContentLoaded", function () {
  const botonesEliminar = document.querySelectorAll(".eliminar-btn");

  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", function () {
      const productoId = boton.dataset.id;
      console.log("Eliminar producto con ID:", productoId);

      fetch("/inventario/datosEliminados/", {
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
          console.log("Producto eliminado:", data);
          // Aquí podrías realizar alguna acción adicional, como actualizar la lista de productos
          // por ejemplo, recargar la página o eliminar el elemento del DOM.
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  });
});

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
