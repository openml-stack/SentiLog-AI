const express = require("express");
const analyzeRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { analyzeFile } = require("../controllers/analyzeController");

/**
 * @swagger
 * /api/analyze/file:
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

module.exports = analyzeRouter;
