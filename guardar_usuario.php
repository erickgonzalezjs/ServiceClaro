<?php
// Obtener los datos del formulario
$cedula = $_POST['cedula'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];

// Aquí puedes realizar la lógica necesaria para almacenar los datos en la base de datos
// Por ahora, simplemente mostraremos los datos recibidos

// Verificar si el cliente ya existe en la base de datos

// Conexión a la base de datos (debes llenar con tus propias credenciales)
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para verificar si el cliente ya está en la base de datos
$sql = "SELECT * FROM clientes WHERE cedula = '$cedula'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // El cliente ya existe, actualizar sus datos
  $row = $result->fetch_assoc();
  $idCliente = $row["id_cliente"];
  $sql = "UPDATE clientes SET apellido='$apellido', correo='$correo', direccion='$direccion', telefono='$telefono' WHERE id_cliente='$idCliente'";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(array(
      'success' => true,
      'message' => 'Datos actualizados correctamente',
      'data' => array(
        'cedula' => $cedula,
        'apellido' => $apellido,
        'correo' => $correo,
        'direccion' => $direccion,
        'telefono' => $telefono
      )
    ));
  } else {
    echo json_encode(array(
      'success' => false,
      'message' => 'Error al actualizar los datos: ' . $conn->error
    ));
  }
} else {
  // El cliente es nuevo, insertar sus datos
  $sql = "INSERT INTO clientes (cedula, apellido, correo, direccion, telefono) VALUES ('$cedula', '$apellido', '$correo', '$direccion', '$telefono')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode(array(
      'success' => true,
      'message' => 'Cliente registrado correctamente',
      'data' => array(
        'cedula' => $cedula,
        'apellido' => $apellido,
        'correo' => $correo,
        'direccion' => $direccion,
        'telefono' => $telefono
      )
    ));
  } else {
    echo json_encode(array(
      'success' => false,
      'message' => 'Error al registrar el cliente: ' . $conn->error
    ));
  }
}

$conn->close();
?>
