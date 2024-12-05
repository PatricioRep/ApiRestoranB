const mongoose = require('mongoose');

const localSchema = new mongoose.Schema({
    idUsuario: { type: String, required: true },
    idLocal: { type: Number, required: true, unique: true }, // Campo para idLocal único
    nombreLocal: { type: String, required: true },
    region: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Local', localSchema);
