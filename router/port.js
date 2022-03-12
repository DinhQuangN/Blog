const express = require('express');
const {
	getPort,
	createPort,
	updatePort,
	deletePort,
	getCategories,
	getProfile
} = require('../controllers/port');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', getPort);
router.get('/search', getCategories);
router.get('/:id', getProfile);

router.post('/', auth, createPort);
router.patch('/:id', auth, updatePort);
router.delete('/:id', auth, deletePort);

module.exports = router;
