document.getElementById("productoForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir envío predeterminado

    const formData = new FormData(this);

    fetch("registro.php", { 
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
            this.reset();
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error("Error en la petición", error);
        alert("Error en la conexión con el servidor.");
    });
});

// Validación de código
document.getElementById("codigo").addEventListener("blur", function() {
    let codigo = this.value.trim();
    let regex = /^[A-Za-z0-9]{5,15}$/;

    if (!regex.test(codigo)) {
        alert("El código debe tener entre 5 y 15 caracteres alfanuméricos.");
        this.value = "";
        return;
    }

    // Verificar en la base de datos si es único
    fetch("validar-codigo.php?codigo=" + encodeURIComponent(codigo))
        .then(response => response.json())
        .then(data => {
            if (!data.unico) {
                alert("El código ya existe. Intente con otro.");
                this.value = "";
            }
        })
        .catch(error => {
            console.error("Error verificando código", error);
            alert("Error al verificar código en el servidor.");
        });
});

// Validación de nombre
document.getElementById("nombre").addEventListener("blur", function() {
    let nombre = this.value.trim();
    if (nombre.length < 2 || nombre.length > 50) {
        alert("El nombre debe tener entre 2 y 50 caracteres.");
        this.value = "";
    }
});

// Cargar bodegas dinámicamente
document.addEventListener("DOMContentLoaded", function() {
    fetch("obtener-bodegas.php")
        .then(response => response.json())
        .then(data => {
            let bodegaSelect = document.getElementById("bodega");
            bodegaSelect.innerHTML = `<option value="">Seleccione una bodega</option>`;
            data.forEach(bodega => {
                bodegaSelect.innerHTML += `<option value="${bodega.id}">${bodega.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando bodegas", error));
});

// Cargar sucursales según la bodega seleccionada
document.getElementById("bodega").addEventListener("change", function() {
    let bodegaId = this.value;
    let sucursalSelect = document.getElementById("sucursal");

    sucursalSelect.innerHTML = `<option value="">Seleccione una sucursal</option>`;

    if (bodegaId) {
        fetch("obtener-sucursales.php?bodega=" + encodeURIComponent(bodegaId))
            .then(response => response.json())
            .then(data => {
                data.forEach(sucursal => {
                    sucursalSelect.innerHTML += `<option value="${sucursal.id}">${sucursal.nombre}</option>`;
                });
            })
            .catch(error => console.error("Error cargando sucursales", error));
    }
});

// Cargar monedas dinámicamente
document.addEventListener("DOMContentLoaded", function() {
    fetch("obtener-monedas.php")
        .then(response => response.json())
        .then(data => {
            let monedaSelect = document.getElementById("moneda");
            monedaSelect.innerHTML = `<option value="">Seleccione una moneda</option>`;
            data.forEach(moneda => {
                monedaSelect.innerHTML += `<option value="${moneda.id}">${moneda.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando monedas", error));
});

// Validación de precio
document.getElementById("precio").addEventListener("blur", function() {
    let precio = this.value.trim();
    let regex = /^\d+(\.\d{1,2})?$/;

    if (!regex.test(precio) || parseFloat(precio) <= 0) {
        alert("Ingrese un precio válido (número positivo con hasta 2 decimales).");
        this.value = "";
    }
});

// Validación de materiales (mínimo 2 seleccionados)
document.getElementById("productoForm").addEventListener("submit", function(event) {
    let checkboxes = document.querySelectorAll('input[name="material[]"]:checked');
    
    if (checkboxes.length < 2) {
        alert("Debe seleccionar al menos dos materiales.");
        event.preventDefault();
    }
});

// Validación de descripción
document.getElementById("descripcion").addEventListener("blur", function() {
    let descripcion = this.value.trim();

    if (descripcion.length < 10 || descripcion.length > 1000) {
        alert("La descripción debe tener entre 10 y 1000 caracteres.");
        this.value = "";
    }
});
