const { Router } = require('express');

const { listUser, loginUser, registerUser, desactivarUser, updateUser, activarUser} = require('../controllers/user.controlle');
const { validarJWT } = require('../middlewares/validator.jwt');

const router = Router();

router.post('/login', validarJWT, loginUser);
//validarJWT
router.post('/add', validarJWT, registerUser);

router.get('/list', validarJWT, listUser);

router.put('/update', validarJWT, updateUser);

router.put('/desactivar', validarJWT, desactivarUser);

router.put('/activar', validarJWT, activarUser);



module.exports = router;
