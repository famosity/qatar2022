const {Router} = require('express');
const {
    createEstadia,
    updateEstadia,
    getEstadiaById,
    getAllEstadia,
    deteleEstadia
}=require('../controllers/estadia');
const router =Router();

router.post(
    '/',createEstadia
);

router.put(
    '/:estadiaId',updateEstadia
);

router.get(
    '/',getAllEstadia
);

router.get(
    '/:estadiaId',getEstadiaById
);   

router.delete(
    '/:estadiaId',deteleEstadia
);

module.exports = router;