const express = require("express");
const newsRouter = express.Router();
const newsController = require("../controllers/newsController");

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news article entry
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, text, date, url]
 *             properties:
 *               url: { type: string }
 *               title: { type: string }
 *               text: { type: string }
 *               date: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: News article created
 */
newsRouter.post("/", newsController.createEntry);

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news entries
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news entries
 */
newsRouter.get("/", newsController.getEntries);

/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get news entry by ID
 *     tags: [News]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: News entry
 */
newsRouter.get("/:id", newsController.getEntry);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete news entry by ID
 *     tags: [News]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Deleted message
 */
newsRouter.delete("/:id", newsController.deleteEntry);

module.exports = newsRouter;
