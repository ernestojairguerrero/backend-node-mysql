const { Router } = require('express');

const { listUser, loginUser, registerUser, desactivarUser, updateUser, activarUser, loginAdmin} = require('../controllers/user.controlle');
const { validarJWT } = require('../middlewares/validator.jwt');

const router = Router();

router.post('/loginUser', loginUser);

router.post('/login-admin', loginAdmin);
//validarJWT
router.post('/add', registerUser);

router.get('/list', listUser);

router.put('/update', updateUser);

router.put('/desactivar', desactivarUser);

router.put('/activar', activarUser);



module.exports = router;
