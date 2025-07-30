
const express = require("express");
const journalRouter = express.Router();
const journalController = require("../controllers/journalController");

/**
 * @swagger
 * /journal:
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
journalRouter.post("/", journalController.createEntry);

/**
 * @swagger
 * /journal:
 *   get:
 *     summary: Get all journal entries
 *     tags: [Journal]
 *     responses:
 *       200:
 *         description: List of journal entries
 */
journalRouter.get("/", journalController.getEntries);

/**
 * @swagger
 * /journal/{id}:
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
journalRouter.get("/:id", journalController.getEntry);

/**
 * @swagger
 * /journal/{id}:
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
journalRouter.delete("/:id", journalController.deleteEntry);

module.exports = journalRouter;

