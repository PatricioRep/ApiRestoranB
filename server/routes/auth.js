const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); // Asegúrate de que la ruta sea correcta

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
