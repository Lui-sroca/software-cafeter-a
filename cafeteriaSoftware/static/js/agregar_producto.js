const openModalBtn = document.getElementById("boton-agregar");
const closeModalBtn = document.getElementById("cerrarBtn");

const modal = document.getElementById("modal");

openModalBtn.addEventListener("click", function () {
  modal.style.display = "flex";
});

closeModalBtn.addEventListener("click", function () {
  modal.style.display = "none";
  console.log("funciona")
});

const submitBtn = document.getElementById("boton-guardar");

submitBtn.addEventListener("click", function () {
  modal.style.display = "none";
  console.log("funciona")
  // Obtener los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const imagen = document.getElementById("imagen").value;
  const precio = document.getElementById("precio").value;
  const estado = document.getElementById("estado").value;
  const cantidad = document.getElementById("cantidad").value;
  const categoria = document.getElementById("categoria").value;

  // Mostrar los valores en la consola (puedes modificar esto según tus necesidades)
  console.log("Nombre:", nombre);
  console.log("Descripción:", descripcion);
  console.log("Imagen:", imagen);
  console.log("Precio:", precio);
  console.log("Estado:", estado);
  console.log("Cantidad:", cantidad);
  console.log("Categoría:", categoria);

  const formData = {
    nombre: nombre,
    descripcion: descripcion,
    imagen: imagen,
    precio: precio,
    estado: estado,
    cantidad: cantidad,
    categoria: categoria,
  };

  fetch("/datosGuardados/", {
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
// Aquí puedes agregar la lógica para enviar los datos al servidor o realizar otras acciones
