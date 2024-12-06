const Mesa = require('../models/Mesas');
const Local = require('../models/Local');

// Crear una mesa
const createMesa = async (req, res) => {
    const { idLocal } = req.body;

    try {
        // Verificar que el local existe
        const local = await Local.findOne({ idLocal });
        if (!local) {
            return res.status(404).json({ message: 'Local no encontrado.' });
        }

        // Generar ID único para la mesa
        let idMesa;
        do {
            idMesa = Math.floor(Math.random() * 100) + 1;
        } while (await Mesa.findOne({ idMesa }));

        const newMesa = new Mesa({ idMesa, idLocal });
        await newMesa.save();

        res.status(201).json({ message: 'Mesa creada con éxito.', mesa: newMesa });
    } catch (error) {
        console.error('Error al crear la mesa:', error);
        res.status(500).json({ message: 'Error del servidor.', error });
    }
};

// Obtener mesas de un local
const getMesasByLocal = async (req, res) => {
    const { idLocal } = req.params;

    try {
        const mesas = await Mesa.find({ idLocal });
        res.status(200).json(mesas);
    } catch (error) {
        console.error('Error al obtener mesas:', error);
        res.status(500).json({ message: 'Error del servidor.', error });
    }
};

// Actualizar una mesa
const updateMesa = async (req, res) => {
    const { idMesa } = req.params;
    const { estado, cantPersonas, confirmado } = req.body;

    try {
        const mesa = await Mesa.findOneAndUpdate(
            { idMesa },
            { estado, cantPersonas, confirmado },
            { new: true }
        );

        if (!mesa) {
            return res.status(404).json({ message: 'Mesa no encontrada.' });
        }

        res.status(200).json({ message: 'Mesa actualizada con éxito.', mesa });
    } catch (error) {
        console.error('Error al actualizar la mesa:', error);
        res.status(500).json({ message: 'Error del servidor.', error });
    }
};

// Eliminar una mesa
const deleteMesa = async (req, res) => {
    const { idMesa } = req.params;

    try {
        const mesa = await Mesa.findOneAndDelete({ idMesa });

        if (!mesa) {
            return res.status(404).json({ message: 'Mesa no encontrada.' });
        }

        res.status(200).json({ message: 'Mesa eliminada con éxito.', mesa });
    } catch (error) {
        console.error('Error al eliminar la mesa:', error);
        res.status(500).json({ message: 'Error del servidor.', error });
    }
};

module.exports = { createMesa, getMesasByLocal, updateMesa, deleteMesa };
