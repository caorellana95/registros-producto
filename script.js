document.addEventListener("DOMContentLoaded", function () {
    console.log("El DOM está listo.");

    document.getElementById("productoForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevenir envío predeterminado
        //Validacion de código
        const codigoInput = document.getElementById("codigo");

        codigoInput.addEventListener("blur", function() {
        let codigo = this.value.trim();
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/;

        // Vacío
        if (codigo === "") {
            alert("El código del producto no puede estar en blanco.");
            this.value = "";
            return;
        }

        // Formato
        if (!regex.test(codigo)) {
            alert("El código del producto debe contener letras y números.");
            this.value = "";
            return;
        }

        // Longitud
        if (codigo.length < 5 || codigo.length > 15) {
            alert("El código del producto debe tener entre 5 y 15 caracteres.");
            this.value = "";
            return;
        }

        // base de datos
         fetch("validar-codigo.php?codigo=" + encodeURIComponent(codigo))
             .then(response => response.json())
             .then(data => {
                 if (!data.unico) {
                     alert("El código del producto ya está registrado.");
                     codigoInput.value = "";
                 }
             })
             .catch(error => {
                 console.error("Error verificando código", error);
                 alert("Error al verificar código en el servidor.");
            });
        });

        //Validación Nombre

        const nombreInput = document.getElementById("nombre");

        nombreInput.addEventListener("blur", function () {
        let nombre = this.value.trim();

        // Vacío
        if (nombre === "") {
            alert("El nombre del producto no puede estar en blanco.");
            this.value = "";
            return;
        }

        // mínimo 2 caracteres, máximo 50
        if (nombre.length < 2 || nombre.length > 50) {
            alert("El nombre del producto debe tener entre 2 y 50 caracteres.");
            this.value = "";
            return;
        }
    });

    fetch("obtener-bodegas.php")
        .then(response => response.json())
        .then(data => {
            let bodegaSelect = document.getElementById("bodega");
            bodegaSelect.innerHTML = `<option value=""></option>`;
            data.forEach(bodega => {
                bodegaSelect.innerHTML += `<option value="${bodega.id}">${bodega.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando bodegas", error));

        document.getElementById("productoForm").addEventListener("submit", function (event) {
            if (bodegaSelect.value === "") {
                alert("Debe seleccionar una bodega.");
                event.preventDefault(); 
            }
        });

    const bodegaSelect = document.getElementById("bodega");
    const sucursalSelect = document.getElementById("sucursal");

    // Cargar sucursales según la bodega seleccionada
    bodegaSelect.addEventListener("change", function () {
        let bodegaId = bodegaSelect.value;

        // Vaciar el select de sucursales antes de cargar nuevas opciones
        sucursalSelect.innerHTML = `<option value=""></option>`;

        if (bodegaId) {
            // Obtener las sucursales para la bodega seleccionada
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

    // Validación de sucursal al enviar el formulario
        if (sucursalSelect.value === "") {
            alert("Debe seleccionar una sucursal para la bodega seleccionada.");
            event.preventDefault();
        }
    
        
    
        // Validación de materiales
        let checkboxesMarcados = document.querySelectorAll('input[name="material[]"]:checked');
        if (checkboxesMarcados.length < 2) {
            alert("Debe seleccionar al menos dos materiales antes de enviar el formulario.");
            return;
        }

        // Validación de precio
        let precio = document.getElementById("precio").value.trim();
        let regexPrecio = /^\d+(\.\d{1,2})?$/;
        if (precio === "") {
            alert("El precio del producto no puede estar en blanco.");
            this.value = "";
            return;
        }

        if (!regexPrecio.test(precio) || parseFloat(precio) <= 0) {
            alert("Ingrese un precio válido (número positivo con hasta 2 decimales).");
            this.value = "";
            return;
        }

        const monedaSelect = document.getElementById("moneda");

    // Cargar monedas desde la base de datos
    fetch("obtener-monedas.php")
        .then(response => response.json())
        .then(data => {
            monedaSelect.innerHTML = `<option value=""></option>`;
            data.forEach(moneda => {
                monedaSelect.innerHTML += `<option value="${moneda.id}">${moneda.nombre}</option>`;
            });
        })
        .catch(error => console.error("Error cargando monedas", error));

    // Validación de moneda al enviar el formulario
        if (monedaSelect.value === "") {
            alert("Debe seleccionar una moneda para el producto.");
            event.preventDefault(); 
            }

        // Validación en tiempo real de los checkboxes
    document.querySelectorAll('input[name="material[]"]').forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            let checkboxesMarcados = document.querySelectorAll('input[name="material[]"]:checked');

            if (checkboxesMarcados.length < 2) {
                alert("Debe seleccionar al menos dos materiales para el producto.");
                event.preventDefault();
            } 
        });
    });

        let descripcion = document.getElementById("descripcion").value.trim();

        // Verifica que la descripción no esté vacía
        if (descripcion === "") {
            alert("La descripción del producto no puede estar en blanco.");
            event.preventDefault();
            return;
        }

        // Verifica que la descripción tenga entre 10 y 1000 caracteres
        if (descripcion.length < 10 || descripcion.length > 1000) {
            alert("La descripción del producto debe tener entre 10 y 1000 caracteres.");
            event.preventDefault(); //
            return;
        }

        const formData = new FormData(this);
        fetch("registro.php", { 
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(text => {
            console.log("Respuesta en bruto:", text);
        
            let data;
            try {
                data = JSON.parse(text);
            } catch (error) {
                console.error("Error al parsear JSON:", error);
                alert("La respuesta del servidor no es válida.");
                return;
            }
        
            console.log("Respuesta convertida a JSON:", data);
        
            if (data.success) {
                alert(data.success);
                document.getElementById("productoForm").reset();
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error("Error en la petición:", error);
            alert("Error en la conexión con el servidor.");
        });
    
    });
});
