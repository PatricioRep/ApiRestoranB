const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  idUsuario: { type: Number, unique: true, required: true }, // Nuevo campo idUsuario
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  perfil: { type: String, default: 'Cliente' } // Campo perfil con valor predeterminado 'Cliente'
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
