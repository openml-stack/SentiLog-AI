const express = require("express");
const analyzeRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { analyzeFile, analyzeText } = require("../controllers/analyzeController");

/**
 * @swagger
 * /analyze/file:
 *   post:
 *     summary: Analyze uploaded document (PDF, DOCX, TXT)
 *     tags: [Analyze]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Text and sentiment analysis result
 */
analyzeRouter.post("/file", upload.single("file"), analyzeFile);
/**
 * @swagger
 * /analyze/text:
 *   post:
 *     summary: Analyze plain text for sentiment
 *     tags: [Analyze]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text:
 *                 type: string
 *                 description: Text to analyze
 *     responses:
 *       200:
 *         description: Sentiment analysis result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sentiment:
 *                   type: string
 *                   description: Sentiment label
 */
analyzeRouter.post("/text", analyzeText);
module.exports = analyzeRouter;
