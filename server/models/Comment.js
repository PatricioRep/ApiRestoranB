const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    idUsuario: { type: Number, required: true }, // ID único del usuario que hace el comentario
    comentario: { type: String, required: true }, // Texto del comentario
    nombreLocal: { type: String, required: true }, // Nombre del local comentado
    fecha: { type: Date, default: Date.now } // Fecha de creación del comentario
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
