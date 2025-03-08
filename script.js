// Función para mostrar la vista previa generando 2 columnas de cajas 
// hasta cubrir un alto máximo de 27 cm (270 mm)
function mostrarPreview() {
    var mensaje = document.getElementById('mensaje').value;
    if (!mensaje.trim()) {
        alert("Por favor, escribe un mensaje.");
        return;
    }

    // Ocultar el editor y mostrar la previsualización
    document.getElementById('editor').style.display = 'none';
    document.getElementById('preview').style.display = 'block';
    document.getElementById('preview').classList.add('active'); // Para ocultar el footer

    var previewContainer = document.getElementById('preview-cajas');
    previewContainer.innerHTML = ''; // Limpiar el contenedor

    // Crear un elemento temporal para medir la altura real de la caja (en px)
    var temp = document.createElement('div');
    temp.className = 'nota';
    temp.style.visibility = 'hidden';
    temp.style.position = 'absolute';
    temp.textContent = mensaje;
    document.body.appendChild(temp);
    var boxHeightPx = temp.offsetHeight;
    document.body.removeChild(temp);

    // Conversión de píxeles a milímetros
    var boxHeightMm = boxHeightPx / 3.78;
    
    // Dimensiones de una hoja A4 con márgenes
    var maxAlturaPaginaMm = 270; // Limitamos a 270mm para evitar saltos de página
    
    // Calcular la cantidad de filas posibles sin exceder el alto de la página
    var filas = Math.floor(maxAlturaPaginaMm / boxHeightMm);
    var columnas = 2; // Dos columnas fijas
    var totalCajas = filas * columnas;

    for (var i = 0; i < totalCajas; i++) {
        var caja = document.createElement('div');
        caja.className = 'nota';
        caja.textContent = mensaje;
        previewContainer.appendChild(caja);
    }
}

// Función para volver al modo edición
function volver() {
    document.getElementById('preview').style.display = 'none';
    document.getElementById('editor').style.display = 'block';
}

// Función para imprimir la nota
function imprimir() {
    window.print();
}

// Autoajuste en altura del textarea según su contenido
var textarea = document.getElementById('mensaje');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});
