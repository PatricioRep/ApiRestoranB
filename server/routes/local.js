const express = require('express');
const router = express.Router();
const {
    addLocal,
    getLocals,
    getLocalsByUserId,
    deleteLocal,
} = require('../controllers/localController');

// Ruta para agregar un local
router.post('/add', async (req, res, next) => {
    try {
        await addLocal(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener todos los locales
router.get('/all', async (req, res, next) => {
    try {
        await getLocals(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener locales de un usuario específico por su ID de usuario
router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validar si el ID del usuario es válido
        if (!id) {
            return res.status(400).json({ message: 'El ID de usuario es obligatorio' });
        }

        await getLocalsByUserId(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un local por su ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validar si el ID del local es válido
        if (!id) {
            return res.status(400).json({ message: 'El ID del local es obligatorio' });
        }

        await deleteLocal(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
