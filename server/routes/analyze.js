const express = require('express');
const multer = require('multer');
const { analyzeFile } = require('../controllers/analyzeController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), analyzeFile);

module.exports = router;