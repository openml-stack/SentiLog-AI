import express from 'express';
import multer from 'multer';
import { analyzeFile } from '../controllers/analyzeController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), analyzeFile);

export default router;