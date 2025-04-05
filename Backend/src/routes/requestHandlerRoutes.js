const express = require('express');
const { apiRequestHandler } = require('../controllers/requestController');

const router = express.Router();


router.all("/",apiRequestHandler);


module.exports = router;