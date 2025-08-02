const express = require("express");
const journalRouter = express.Router();
const journalController = require("../controllers/journalController");
const jwtmiddleware = require("../middleware/jwt");

/**
 * @swagger
 * /journal/create:
 *   post:
 *     summary: Create a new journal entry (Authentication Required)
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Authentication required
 */
journalRouter.post("/", jwtmiddleware, journalController.createEntry);

journalRouter.post("/create", journalController.createEntry);

/**
 * @swagger
 * /journal:
 *   get:
 *     summary: Get user's journal entries (Authentication Required)
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's journal entries
 *       401:
 *         description: Authentication required
 */
journalRouter.get("/", jwtmiddleware, journalController.getEntries);

/**
 * @swagger
 * /journal/{id}:
 *   get:
 *     summary: Get journal entry by ID (Authentication Required)
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Journal entry
 *       401:
 *         description: Authentication required
 */
journalRouter.get("/:id", jwtmiddleware, journalController.getEntry);

/**
 * @swagger
 * /journal/{id}:
 *   delete:
 *     summary: Delete journal entry by ID (Authentication Required)
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted message
 *       401:
 *         description: Authentication required
 */
journalRouter.delete("/:id", jwtmiddleware, journalController.deleteEntry);

module.exports = journalRouter;
