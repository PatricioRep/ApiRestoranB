const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
    addLocal,
    getLocals,
    getLocalsByUserId,
    deleteLocal,
    getLocalById,
} = require('../controllers/localController');

const router = express.Router();

// Crear el directorio `uploads/` si no existe
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Ruta para agregar un local con imagen
router.post('/add', upload.single('imagenLocal'), async (req, res, next) => {
    try {
        req.body.imagenLocal = req.file ? req.file.path : null; // Añadir la ruta de la imagen al cuerpo de la solicitud
        await addLocal(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener todos los locales
router.get('/all', async (req, res, next) => {
    try {
        await getLocals(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener locales de un usuario específico por su ID de usuario
router.get('/user/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'El ID de usuario es obligatorio' });
        }
        await getLocalsByUserId(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener un local específico por su idLocal
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'El ID del local es obligatorio' });
        }
        await getLocalById(req, res);
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un local por su idLocal
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'El ID del local es obligatorio' });
        }
        await deleteLocal(req, res);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
