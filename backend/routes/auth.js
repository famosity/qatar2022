const {Router} = require('express');
const{check}=require('express-validator');
const{validarCampos}=require('../middlewares/filter-validator');
const {crearUsuario,loginUsuario,revalidadToken}=require('../controllers/auth');
const router =Router();

router.post(
    '/register',
    [ //middleware
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe tener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe tener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);


router.get('/renew', revalidadToken);

module.exports = router;
