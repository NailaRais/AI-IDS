const express = require('express');
const router = express.Router();
const intrusionController = require('../controllers/intrusionController');

router.post('/', intrusionController.logAlert);
router.get('/', intrusionController.getAlerts);

module.exports = router;
