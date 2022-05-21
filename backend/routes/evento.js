const {Router} = require('express');
const {
    crearEvento,
    actualizarEvento,
    getEventoById,
    getAllEvento
}=require('../controllers/evento');
const router =Router();

router.post(
    '/',crearEvento
);

router.put(
    '/:eventoId',actualizarEvento
);

router.get('/',getAllEvento);

router.get('/:eventoId', getEventoById);

module.exports = router;
