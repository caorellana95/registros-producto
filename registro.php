<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

class Registro {
    public static function RegistroBD() {
        $host = "localhost";
        $dbname = "registro_productos";
        $user = "postgres";
        $password = "CapTeam#1595";

        try {
            $pdo = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            return $pdo;
        } catch (PDOException $e) {
            die(json_encode(["error" => "Error de conexión: " . $e->getMessage()]));
        }
    }

    public static function Guardar() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $codigo = $_POST['codigo'] ?? '';
            $nombre = $_POST['nombre'] ?? '';
            $bodega = $_POST['bodega'] ?? '';
            $sucursal = $_POST['sucursal'] ?? '';
            $moneda = $_POST['moneda'] ?? '';
            $precio = $_POST['precio'] ?? 0;
            $material = $_POST['material'] ?? [];
            $descripcion = $_POST['descripcion'] ?? '';

            if (empty($codigo) || empty($nombre) || empty($bodega) || empty($sucursal) || empty($moneda) || empty($precio)) {
                echo json_encode(["error" => "Todos los campos obligatorios deben estar llenos"]);
                exit();
            }

            $material_json = json_encode($material);

            try {
                $pdo = self::RegistroBD();
                $sql = "INSERT INTO productos(codigo, nombre, bodega, sucursal, moneda, precio, material, descripcion, fecha_creacion)
                        VALUES (:codigo, :nombre, :bodega, :sucursal, :moneda, :precio, :material, :descripcion, NOW())";
                $stm = $pdo->prepare($sql);
                $stm->execute([
                    ':codigo' => $codigo,
                    ':nombre' => $nombre,
                    ':bodega' => $bodega,
                    ':sucursal' => $sucursal,
                    ':moneda' => $moneda,
                    ':precio' => $precio,
                    ':material' => $material_json,
                    ':descripcion' => $descripcion
                ]);

                echo json_encode(["success" => "Producto registrado correctamente"]);
            } catch (PDOException $e) {
                echo json_encode(["error" => "Error al guardar: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["error" => "No autorizado"]);
        }
    }
}

// Llamar a la función para ejecutar la lógica
Registro::Guardar();
?>
