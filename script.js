document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, contraseña }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('responseMessage').textContent = `Usuario registrado: ${result.user.nombre}`;
        // Limpiar el formulario después de un registro exitoso
        document.getElementById('userForm').reset();
      } else {
        document.getElementById('responseMessage').textContent = `Error: ${result.message}`;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      document.getElementById('responseMessage').textContent = 'Error al conectar con el servidor.';
    }
  });
  