const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    idUsuario: { type: Number, required: true },
    idLocal: { type: Number, required: true }, // Asociación con idLocal
    comentario: { type: String, required: true },
    nombreLocal: { type: String, required: true },
    estrellas: { type: Number, required: true }, // Calificación del 1 al 5
    fecha: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
