const { Router } = require('express');

const { validarJWT } = require('../middlewares/validator.jwt')
const { listPost, addPost, updatePost, listPostId, deletePost, aporbarPost, deaporbarPost } = require('../controllers/post.controller');


const router = Router();

router.get('/list', validarJWT, listPost);

router.get('/list-id', validarJWT, listPostId);
//validarJWT
router.post('/add', validarJWT, addPost);

router.put('/update', validarJWT, updatePost);

router.delete('/delete', validarJWT, deletePost);

router.put('/desaprobar', validarJWT, deaporbarPost);

router.put('/aprobar', validarJWT, aporbarPost);

module.exports = router;