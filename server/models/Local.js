const mongoose = require('mongoose');

const localSchema = new mongoose.Schema({
    idUsuario: { type: String, required: true },
    nombreLocal: { type: String, required: true },
    region: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Local', localSchema);
