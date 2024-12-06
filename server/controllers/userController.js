const User = require('../models/User');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Recupera todos los usuarios de la base de datos
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios' });
    }
};

// Promover usuario a locatario
const promoteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ idUsuario: id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.perfil = 'Locatario'; // Cambiar perfil a locatario
        await user.save();

        res.status(200).json({ message: 'Usuario promovido a locatario con éxito' });
    } catch (error) {
        console.error('Error al promover usuario:', error);
        res.status(500).json({ message: 'Error al promover usuario' });
    }
};

// Descender usuario a Cliente
const descenderUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ idUsuario: id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        user.perfil = 'Cliente'; // Cambiar perfil a locatario
        await user.save();

        res.status(200).json({ message: 'Usuario descendio a Cliente con éxito' });
    } catch (error) {
        console.error('Error al descender usuario:', error);
        res.status(500).json({ message: 'Error al descender usuario' });
    }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ idUsuario: id });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
};

module.exports = { getUsers, promoteUser,descenderUser, deleteUser };
