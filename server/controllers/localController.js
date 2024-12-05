const Local = require('../models/Local');
const User = require('../models/User');

// Agregar un local
const addLocal = async (req, res) => {
    const { idUsuario, nombreLocal, region } = req.body;

    try {
        if (!idUsuario || !nombreLocal || !region) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const user = await User.findOne({ idUsuario });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const newLocal = new Local({ idUsuario, nombreLocal, region });
        await newLocal.save();

        res.status(201).json({ message: 'Local añadido con éxito', local: newLocal });
    } catch (error) {
        console.error('Error al agregar local:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener todos los locales
const getLocals = async (req, res) => {
    try {
        const locals = await Local.find();

        const enrichedLocals = await Promise.all(
            locals.map(async (local) => {
                const user = await User.findOne({ idUsuario: local.idUsuario });
                return {
                    idLocal: local._id,
                    idUsuario: local.idUsuario,
                    nombreUsuario: user ? user.nombre : 'Usuario desconocido',
                    nombreLocal: local.nombreLocal,
                    region: local.region,
                };
            })
        );

        res.json(enrichedLocals);
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener locales por ID de usuario
const getLocalsByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const locals = await Local.find({ idUsuario: id });

        // Devolver un array vacío si no se encuentran locales
        res.status(200).json(locals);
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Eliminar un local por ID
const deleteLocal = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLocal = await Local.findByIdAndDelete(id);

        if (!deletedLocal) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }

        res.status(200).json({ message: 'Local eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar local:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

module.exports = { addLocal, getLocals, getLocalsByUserId, deleteLocal };
