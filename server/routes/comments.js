const express = require('express');
const router = express.Router();
const { addComment, getComments, getCommentsByUserId, deleteComment } = require('../controllers/commentController');

// Ruta para agregar un comentario
router.post('/add', addComment);

// Ruta para obtener todos los comentarios enriquecidos
router.get('/all', getComments);

// Ruta para obtener comentarios de un usuario específico por su idUsuario
router.get('/user/:id', getCommentsByUserId);

// Ruta para eliminar un comentario por su ID
router.delete('/:id', deleteComment);

module.exports = router;
