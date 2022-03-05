const express = require('express');
const {
	Register,
	activateEmail,
	login,
	RefreshAccessToken,
	forgotPassword,
	resetPassword,
	logout,
	getUserInfo,
	getUserAllInfo
} = require('../controllers/user');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const router = express.Router();
router.post('/register', Register);
router.post('/activation', activateEmail);
router.post('/login', login);
router.post('/refresh_token', RefreshAccessToken);
router.post('/forgot', forgotPassword);
router.post('/reset', resetPassword);

router.get('/logout', logout);
router.get('/info', auth, getUserInfo);
router.get('/all_info', auth, authAdmin, getUserAllInfo);

module.exports = router;
