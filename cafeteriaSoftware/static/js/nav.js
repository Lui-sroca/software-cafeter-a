document.addEventListener("DOMContentLoaded", function() {
    // Manejo del hover en el menú
    var navInventario = document.getElementById("nav-inventario");
    var funciones = document.querySelectorAll(".funcion");

    if (navInventario) {
        navInventario.addEventListener("mouseover", function() {
            navInventario.classList.add("expanded");
            funciones.forEach(function(funcion) {
                funcion.style.backgroundColor = '#0B970B';
                funcion.querySelector('p').style.display = 'inline'; // Mostrar los párrafos
                funcion.style.justifyContent = 'flex-start'; // Ajustar el contenido
            });
        });

        navInventario.addEventListener("mouseout", function() {
            navInventario.classList.remove("expanded");
            funciones.forEach(function(funcion) {
                funcion.style.transition = "2.5s";
                funcion.style.backgroundColor = '#00AC00'; // Cambiar el color del fondo del div
                funcion.querySelector('p').style.display = 'none'; // Ocultar los párrafos
                funcion.style.justifyContent = 'center'; // Centrar el contenido
            });
        });

        // Extraer y mostrar estilos al cargar la página
        var styles = window.getComputedStyle(navInventario);
        console.log("Width:", styles.width);
        console.log("Background color:", styles.backgroundColor);
    } else {
        console.log("Nav Inventario element not found");
    }

    // Manejo de navegación
    var navItems = {
        "inicio-nav": "/",
        "productos-nav": "/carrito/listar_productos",
        "carrito-nav": "/carrito/",
        "inventario-nav": "/inventario/",
        "finanzas-nav": "/finanzas/",
        "admin-nav": "/admin_interfaz/",
        "empleados-nav": "/empleados/",
        "pedidos-nav": "/ordenes/"
    };

    for (let id in navItems) {
        let element = document.getElementById(id);
        if (element) {
            console.log(`${id.replace("-nav", "").capitalize()} element found`);
            element.addEventListener("click", function() {
                console.log(`${id.replace("-nav", "").capitalize()} clicked`);
                window.location.href = navItems[id];
            });
        } else {
            console.log(`${id.replace("-nav", "").capitalize()} element not found`);
        }
    }
});

// Añadir el método capitalize a String para mejorar los logs
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};