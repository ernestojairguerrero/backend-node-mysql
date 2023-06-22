const { Router } = require('express');

const { validarJWT } = require('../middlewares/validator.jwt')
const { listPost, addPost, updatePost, listPostId, deletePost, aporbarPost, deaporbarPost } = require('../controllers/post.controller');


const router = Router();

router.get('/list', listPost);

router.get('/list-id', listPostId);
//validarJWT
router.post('/add', addPost);

router.put('/update', updatePost);

router.delete('/delete', deletePost);

router.put('/desaprobar', deaporbarPost);

router.put('/aprobar', aporbarPost);

module.exports = router;