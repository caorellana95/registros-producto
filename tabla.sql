CREATE TABLE productos (
    id INT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    bodega VARCHAR(50) NOT NULL,
    sucursal VARCHAR(50) NOT NULL,
    moneda VARCHAR(20) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    material JSON NOT NULL,
    descripcion TEXT,
);


SELECT * FROM productos;
