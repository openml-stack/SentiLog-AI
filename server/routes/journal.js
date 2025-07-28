const express = require("express");
const router = express.Router();
const journalController = require("../controllers/journalController");

/**
 * @swagger
 * /api/journal:
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text: { type: string }
 *     responses:
 *       201:
 *         description: Created journal entry
 */
router.post("/", journalController.createEntry);

/**
 * @swagger
 * /api/journal:
 *   get:
 *     summary: Get all journal entries
 *     tags: [Journal]
 *     responses:
 *       200:
 *         description: List of journal entries
 */
router.get("/", journalController.getEntries);

/**
 * @swagger
 * /api/journal/{id}:
 *   get:
 *     summary: Get journal entry by ID
 *     tags: [Journal]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Journal entry
 */
router.get("/:id", journalController.getEntry);

/**
 * @swagger
 * /api/journal/{id}:
 *   delete:
 *     summary: Delete journal entry by ID
 *     tags: [Journal]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted message
 */
router.delete("/:id", journalController.deleteEntry);

module.exports = router;
