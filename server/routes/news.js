import express from 'express';
import { createEntry, getEntries, getEntry, deleteEntry } from '../controllers/newsController.js';

const router = express.Router();

// Create and analyze
router.post('/', createEntry);
// Get all
router.get('/', getEntries);
// Get one
router.get('/:id', getEntry);
// Delete
router.delete('/:id', deleteEntry);

export default router; 