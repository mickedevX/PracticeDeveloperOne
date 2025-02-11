window.actualizarContador = function (mensajeInput) {
    let contador = document.getElementById('contador');

    if (mensajeInput && contador) {
        contador.textContent = "# Caracteres usando JS resource: " + mensajeInput.value.length + " / 20";

        // Limitar a 10 caracteres
        if (mensajeInput.value.length > 20) {
            mensajeInput.value = mensajeInput.value.substring(0, 20);
        }
    }
};

// Agregar evento cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    let mensajeInput = document.getElementById('{!$Component.mensajeInput}');
    if (mensajeInput) {
        mensajeInput.addEventListener('keyup', function (event) {
            actualizarContador(event.target);
        });
    }
});
