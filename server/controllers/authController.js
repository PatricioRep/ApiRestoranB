const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario con este correo ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Generar un idUsuario único y aleatorio
    let idUsuario;
    do {
      idUsuario = Math.floor(Math.random() * 100000) + 1; // Genera un número entre 1 y 100000
    } while (await User.findOne({ idUsuario })); // Verifica que sea único

    const newUser = new User({
      idUsuario,
      nombre,
      email,
      contraseña: hashedPassword,
      perfil: 'Cliente'
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Función para iniciar sesión de un usuario
const loginUser = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear el token JWT con nombre y perfil
    const token = jwt.sign(
      { idUsuario: user.idUsuario, perfil: user.perfil, nombre: user.nombre },
      'secreto', // Cambia esta clave secreta a una variable de entorno
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        idUsuario: user.idUsuario,
        nombre: user.nombre,
        email: user.email,
        perfil: user.perfil
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = { registerUser, loginUser };
