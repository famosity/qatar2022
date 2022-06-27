import {Router} from "express";
const router = Router();

import * as useCtrl from '../controllers/user.controller';
import {authJwt,verifySignup} from '../middleware'; 

router.post('/',
[
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
],useCtrl.createUser)

export default router;