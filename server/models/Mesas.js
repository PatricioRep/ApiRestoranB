const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
    idMesa: { type: Number, required: true, unique: true },
    idLocal: { type: Number, required: true },
    estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' },
    cantPersonas: { type: Number, default: null },
    confirmado: { type: String, enum: ['si', 'no'], default: 'no' },
});

const Mesa = mongoose.model('Mesa', MesaSchema);
module.exports = Mesa;
