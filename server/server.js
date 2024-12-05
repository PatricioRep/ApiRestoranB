require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Importaciones corregidas
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/user');
const localRoutes = require('./routes/local');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};
connectDB();

// Rutas de API
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/local', localRoutes);

// Servir archivos estáticos
const staticPath = path.join(__dirname, '../client/src/pages');
app.use(express.static(staticPath));

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  if (!req.route) {
    return res.status(404).json({ message: 'Ruta no encontrada' });
  }
  next();
});

// Servir 'index.html' como fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
