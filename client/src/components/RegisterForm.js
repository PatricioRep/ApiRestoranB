import React, { useState } from 'react';

function RegisterForm() {
  // Estados para manejar los datos del formulario y el mensaje de respuesta
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    try {
      // Realiza la petición POST al servidor
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, contraseña }), // Envía los datos en formato JSON
      });

      const result = await response.json(); // Convierte la respuesta a JSON

      if (response.ok) {
        // Si la respuesta es exitosa, muestra el mensaje y limpia el formulario
        setResponseMessage(`Usuario registrado: ${result.user?.nombre}`);
        setNombre('');
        setEmail('');
        setContraseña('');
      } else {
        // Si hay un error, muestra el mensaje de error
        setResponseMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en la solicitud:', error);
      setResponseMessage('Error al conectar con el servidor.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <br />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <label htmlFor="contraseña">Contraseña:</label>
      <input
        type="password"
        id="contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
      <br />
      <button type="submit">Registrar</button>
      <div>{responseMessage}</div> {/* Muestra el mensaje de respuesta */}
    </form>
  );
}

export default RegisterForm;
