const express = require('express');
const router = express.Router();
const {
    createMesa,
    getMesasByLocal,
    updateMesa,
    deleteMesa,
} = require('../controllers/mesasController');

// Crear una mesa
router.post('/add', createMesa);

// Obtener mesas por local
router.get('/:idLocal', getMesasByLocal);

// Actualizar una mesa
router.put('/:idMesa', updateMesa);

// Eliminar una mesa
router.delete('/:idMesa', deleteMesa);

module.exports = router;
