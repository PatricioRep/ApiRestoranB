const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id nombre email perfil'); // Incluye los campos necesarios
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
});

// Promover un usuario a Locatario
router.put('/:id/promote', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.perfil = 'Locatario'; // Cambiar perfil a Locatario
    await user.save();

    res.status(200).json({ message: 'Usuario promovido a Locatario', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al promover usuario', error });
  }
});

// Promover un usuario a Locatario
router.put('/:id/descender', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.perfil = 'Cliente'; // Cambiar perfil a Cliente
    await user.save();

    res.status(200).json({ message: 'Usuario descendio a Cliente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al descender al usuario', error });
  }
});
// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
});

module.exports = router;
