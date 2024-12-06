const Local = require('../models/Local');
const User = require('../models/User');

// Generar un idLocal único
const generarIdLocal = async () => {
    let idLocal;
    let existe;
    do {
        idLocal = Math.floor(Math.random() * 1000) + 1; // Generar un número aleatorio entre 1 y 1000
        existe = await Local.findOne({ idLocal }); // Verificar si ya existe en la base de datos
    } while (existe);
    return idLocal;
};
//Agregar un local
const axios = require('axios');  // Asegúrate de tener axios importado

const addLocal = async (req, res) => {
    const { idUsuario, nombreLocal, region, ubicacion, descripcion } = req.body;
    console.log('Datos recibidos:', req.body); // Depuración

    const imagenLocal = req.file ? `${req.file.filename}` : null;

    let coordenadas = null;  // Inicializar coordenadas en null

    try {
        // Verificar que todos los campos sean proporcionados
        if (!idUsuario || !nombreLocal || !region || !ubicacion || !descripcion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario existe
        const user = await User.findOne({ idUsuario });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Solicitar coordenadas de la ubicación usando LocationIQ        
        try {
            const geoResponse = await axios.get(`https://us1.locationiq.com/v1/search?key=pk.8e44377563a5b42f85f78f251f668d95&q=${encodeURIComponent(ubicacion)}&format=json`);
            console.log('Respuesta de LocationIQ:', geoResponse.data);  // Depuración de la respuesta
            if (geoResponse.data && geoResponse.data.length > 0) {
                const { lat, lon } = geoResponse.data[0];
                coordenadas = { lat, lon };
            } else {
                return res.status(400).json({ message: 'No se pudo obtener las coordenadas de la ubicación proporcionada' });
            }
        } catch (error) {
            console.error('Error al obtener las coordenadas:', error.response ? error.response.data : error.message);
            return res.status(500).json({ message: 'Error al obtener las coordenadas de la ubicación', error });
        }

        // Generar un id único para el local
        const idLocal = await generarIdLocal(); 

        // Crear el nuevo local
        const newLocal = new Local({
            idUsuario,
            idLocal,
            nombreLocal,
            region,
            imagenLocal,
            ubicacion,
            descripcion,
            coordenadas,  // Ahora coordenadas es definida
            estado: true  // Estado siempre verdadero
        });

        // Guardar el local en la base de datos
        await newLocal.save();

        // Enviar respuesta de éxito
        res.status(201).json({ message: 'Local añadido con éxito', local: newLocal });

    } catch (error) {
        console.error('Error al agregar local:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener locales por ID de usuario
const getLocalsByUserId = async (req, res) => {
    const { id } = req.params;

    try {
        const locals = await Local.find({ idUsuario: id });
        res.status(200).json(locals);
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener un local por su idLocal
const getLocalById = async (req, res) => {
    const { id } = req.params;

    try {
        const local = await Local.findOne({ idLocal: id });
        if (!local) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }

        res.status(200).json(local);
    } catch (error) {
        console.error('Error al obtener el local:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Eliminar un local por idLocal
const deleteLocal = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedLocal = await Local.findOneAndDelete({ idLocal: id });
        if (!deletedLocal) {
            return res.status(404).json({ message: 'Local no encontrado' });
        }

        res.status(200).json({ message: 'Local eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar local:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};

// Obtener todos los locales
const getLocals = async (req, res) => {
    try {
        const locals = await Local.find();  // Obtén los locales desde la base de datos

        res.status(200).json(locals);  // Envía la respuesta con los locales
    } catch (error) {
        console.error('Error al obtener locales:', error);
        res.status(500).json({ message: 'Error del servidor', error });
    }
};



module.exports = { addLocal, getLocals, getLocalsByUserId, deleteLocal, getLocalById };
