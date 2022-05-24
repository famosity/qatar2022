const {Router} = require('express');
const {
    createCompra,
    getAllCompra
}=require('../controllers/compra');
const router =Router();

router.post(
    '/',createCompra
);

router.get(
    '/',getAllCompra
)

module.exports = router;