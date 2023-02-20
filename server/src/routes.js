const express = require('express');
const router = express.Router();

const login = require('./api/login');

// my
router.post('/api/login', login);


module.exports = router;
