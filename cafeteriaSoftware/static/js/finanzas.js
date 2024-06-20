document.getElementById("descargar-excel").addEventListener("click", function(){
    window.location.href = "/finanzas/reporte_excel/";
    console.log("funciona")
})

document.addEventListener("DOMContentLoaded", function() {
    // Obtén el contexto del canvas
    let ctx = document.getElementById("grafica_ventas").getContext("2d");

    // Datos para la gráfica
    let data = {
        labels: ["Vino", "Tequila", "Cerveza"],
        datasets: [{
            label: "Mi gráfica de bebidas",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: [12, 30, 20],
        }]
    };

    // Configuración de la gráfica
    let options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    // Crear la instancia de la gráfica
    let myChart = new Chart(ctx, {
        type: "bar", // Tipo de gráfica: bar, line, pie, etc.
        data: data,
        options: options
    });
})