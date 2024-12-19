const express = require('express');
const ordenController = require('../controllers/ordenController');


const router = express.Router();

//router
router.post('/insert', ordenController.insert);
router.put('/update', ordenController.update);


module.exports = router;