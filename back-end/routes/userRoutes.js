// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();




// router.post('/register', userController.registerUser);






router.post('/login', userController.loginUser);

router.post('/logout', authenticateJWT, userController.logoutUser);
router.post('/refreshToken', userController.refreshToken);

// router.get('/user', authenticateJWT, userController.getThisUser);
// router.get('/users', authenticateJWT, userController.getAllUsers);
router.get('/profile', authenticateJWT, userController.getUserProfile);

// Tambahkan route lain seperti updateUser, deleteUser sesuai kebutuhan

module.exports = router;
