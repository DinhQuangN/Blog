const express = require('express');
const {
	getCategories,
	CreateCategories
} = require('../controllers/categories');

const router = express.Router();

router.get('/', getCategories);
router.post('/', CreateCategories);

module.exports = router;
