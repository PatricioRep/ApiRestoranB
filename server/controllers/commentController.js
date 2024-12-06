const Comment = require('../models/Comment');
const User = require('../models/User');

// Agregar un comentario
const addComment = async (req, res) => {
    const { idUsuario, idLocal, comentario, nombreLocal, estrellas } = req.body;

    try {
        // Validar que todos los campos sean proporcionados
        if (!idUsuario || !idLocal || !comentario || !nombreLocal || !estrellas) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Validar que la calificación de estrellas esté entre 1 y 5
        if (estrellas < 1 || estrellas > 5) {
            return res.status(400).json({ message: 'La calificación debe estar entre 1 y 5 estrellas' });
        }

        // Validar que el usuario exista en la base de datos
        const user = await User.findOne({ idUsuario });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear y guardar el nuevo comentario
        const newComment = new Comment({ idUsuario, idLocal, comentario, nombreLocal, estrellas });
        await newComment.save();

        res.status(201).json({ message: 'Comentario añadido con éxito', comentario: newComment });
    } catch (error) {
        console.error('Error al agregar comentario:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener todos los comentarios con nombres de usuarios
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();

        const enrichedComments = await Promise.all(
            comments.map(async (comment) => {
                const user = await User.findOne({ idUsuario: comment.idUsuario });
                return {
                    idComentario: comment._id,
                    idUsuario: comment.idUsuario,
                    idLocal: comment.idLocal, // Incluir idLocal
                    nombreUsuario: user ? user.nombre : 'Usuario desconocido',
                    comentario: comment.comentario,
                    nombreLocal: comment.nombreLocal,
                    estrellas: comment.estrellas, // Incluir calificación de estrellas
                    fecha: comment.fecha,
                };
            })
        );

        res.json(enrichedComments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener comentarios de un usuario específico
const getCommentsByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const comments = await Comment.find({ idUsuario: id });

        const enrichedComments = await Promise.all(
            comments.map(async (comment) => {
                const user = await User.findOne({ idUsuario: comment.idUsuario });
                return {
                    idComentario: comment._id,
                    idUsuario: comment.idUsuario,
                    idLocal: comment.idLocal, // Incluir idLocal
                    nombreUsuario: user ? user.nombre : 'Usuario desconocido',
                    comentario: comment.comentario,
                    nombreLocal: comment.nombreLocal,
                    estrellas: comment.estrellas, // Incluir calificación de estrellas
                    fecha: comment.fecha,
                };
            })
        );

        res.status(200).json(enrichedComments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener comentarios por idLocal
const getCommentsByLocal = async (req, res) => {
    const { idLocal } = req.params;

    try {
        const comments = await Comment.find({ idLocal });

        res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Eliminar un comentario por ID
const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

module.exports = { addComment, getComments, getCommentsByUserId, getCommentsByLocal, deleteComment };
