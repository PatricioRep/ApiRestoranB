const mongoose = require('mongoose');

const localSchema = new mongoose.Schema({
    idUsuario: { type: String, required: true },
    idLocal: { type: Number, required: true, unique: true }, // Identificador único
    nombreLocal: { type: String, required: true },
    region: { type: String, required: true },
    fechaCreacion: { type: Date, default: Date.now },
    imagenLocal: { type: String, default: null }, // Nuevo campo para la imagen del local
<<<<<<< HEAD
    ubicacion: { type: String, required: true },
    descripcion: { type: String, required: true },
    coordenadas: {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true }
    },
    estado: { type: Boolean, default: true }, // El campo estado como Booleano y con valor predeterminado
});


=======
});

>>>>>>> 107e1e3b7bb5182f2cfb7e388495799d5eb55896
module.exports = mongoose.model('Local', localSchema);
