const {Router} = require('express');
const {
    createPaquete,
    updatePaquete,
    getPaqueteById,
    getAllPaquete,
    detelePaquete,
    
}=require('../controllers/paquete');
const router =Router();

router.post(
    '/',createPaquete
);

router.put(
    '/:paqueteId',updatePaquete
)

router.get(
    '/:paqueteId',getPaqueteById
)



router.get(
    '/',getAllPaquete
)

router.delete(
    '/:paqueteId',detelePaquete
)



module.exports = router;