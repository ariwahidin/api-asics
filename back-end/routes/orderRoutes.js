// routes/userRoutes.js
const express = require('express');
const orderController = require('../controllers/orderController');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

// router.get('/all', authenticateJWT, orderController.getAllOrderBySPK);
router.get('/delivery', authenticateJWT, orderController.getAllOrderByDelivery);

module.exports = router;
