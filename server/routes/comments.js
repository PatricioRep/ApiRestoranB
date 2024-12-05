const express = require('express');
const router = express.Router();
const {
    addComment,
    getComments,
    getCommentsByUserId,
    deleteComment,
} = require('../controllers/commentController');

// Ruta para agregar un comentario
router.post('/add', async (req, res, next) => {
    try {
        await addComment(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener todos los comentarios
router.get('/all', async (req, res, next) => {
    try {
        await getComments(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener comentarios de un usuario específico por su ID de usuario
router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validar si el ID del usuario es válido
        if (!id) {
            return res.status(400).json({ message: 'El ID de usuario es obligatorio' });
        }

        await getCommentsByUserId(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un comentario por su ID
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validar si el ID del comentario es válido
        if (!id) {
            return res.status(400).json({ message: 'El ID del comentario es obligatorio' });
        }

        await deleteComment(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
