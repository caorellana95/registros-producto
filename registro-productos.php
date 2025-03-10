<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device=width, initial-scale=1.0">
    <title>Registro de productos</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form id="productoForm" action="registro-productos.php" method="POST">
        <h2>Formulario de Productos</h2>
        <div class="form-grid">
        <div class="form-group">
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" name="codigo" required>
        </div>
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        <div class="form-group">
            <label for="bodega">Bodega:</label>
            <select name="bodega" id="bodega"required>
                <option value="">Seleccione una bodega</option>
                <option value="Bodega 1">Bodega 1</option>
                <option value="Bodega 2">Bodega 2</option>
            </select>
        </div>
        <div class="form-group">
            <label for="sucursal">Sucursal:</label>
            <select name="sucursal" id="sucursal" required>
                <option value="">Seleccione una sucursal</option>
                <option value="Sucursal 1">Sucursal 1</option>
                <option value="Sucursal 2">Sucursal 2</option>
            </select>
        </div>            
        <div class="form-group">
            <label for="moneda">Moneda:</label>
            <select name="moneda" id="moneda" required>
                <option value="">Seleccione una moneda</option>
                <option value="Dolar">Dolar</option>
                <option value="Peso">Peso</option>
                <option value="Euro">Euro</option>
                <option value="Yen">Yen</option>
            </select>
        </div>
        <div class="form-group">
            <label for="precio">Precio:</label>
            <input type="number" id="precio" name="precio" step="0.01" required>            
        </div>
    </div>

        <div class="form-group">
            <label for="material">Material de producto:</label>
            <div class="checkbox-group">
                <input type="checkbox" id="plastico" name="material[]" value="plastico">
                <label for="plastico">Plástico</label>

                <input type="checkbox" id="metal" name="material[]" value="metal">
                <label for="metal">Metal</label>

                <input type="checkbox" id="madera" name="material[]" value="madera">
                <label for="madera">Madera</label>

                <input type="checkbox" id="vidrio" name="material[]" value="vidrio">
                <label for="vidrio">Vidrio</label>

                <input type="checkbox" id="textil" name="material[]" value="textil">
                <label for="textil">Textil</label>
            </div>
        </div>
    </div>
        <div class="form-group">
            <label for="descripcion">Descripcion</label>
            <textarea name="descripcion" id="descripcion" rows="3" required></textarea>            
        </div>
        
        <button type="submit">Guardar Producto</button>

        
    </form>

</body>

</html>