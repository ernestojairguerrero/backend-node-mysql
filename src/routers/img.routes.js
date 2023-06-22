const { Router } = require('express');

const { addAvatar } = require('../controllers/img.controller');

const router = Router();

router.post('/avatar', addAvatar);

module.exports = router;