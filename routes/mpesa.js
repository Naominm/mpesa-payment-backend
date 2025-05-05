const express = require('express');
const { initiateSTKPush } = require('../controllers/mpesaController.js');
const router = express.Router();

router.post('/pay', initiateSTKPush);
module.exports = router;
