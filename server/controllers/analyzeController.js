const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const axios = require('axios');
async function extractText(file) {
  const ext = file.originalname.split('.').pop().toLowerCase();

  if (ext === 'pdf') {
    const buffer = fs.readFileSync(file.path);
    const data = await pdfParse(buffer);
    return data.text;
  }

  if (ext === 'docx') {
    const buffer = fs.readFileSync(file.path);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (ext === 'txt') {
    return fs.promises.readFile(file.path, 'utf-8');
  }

  throw new Error('Unsupported file type');
}

const analyzeFile = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const text = await extractText(file);

    // Call the ML API for sentiment analysis
    const mlApiUrl = process.env.ML_API_URL || 'http://localhost:8060/ml-api';
    const mlRes = await axios.post(`${mlApiUrl}/vader/analyze`, { text });

    // mlRes.data should have { sentiment: ... }
    res.json({ 
      extractedText: text, 
      sentiment: { sentiment : mlRes.data.sentiment }
    }); 
  } catch (err) {
    if(err.status === 400) {
      return res.status(400).json({ error: "File not Supported" });
    }
    res.status(500).json({ error: err.message });
  } finally {
    fs.unlinkSync(file.path);
  }
};

const analyzeText = async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'No text provided' });
  }
  
  try {
    const mlApiUrl = process.env.ML_API_URL || 'http://localhost:8060/ml-api';

    const mlRes = await axios.post(`${mlApiUrl}/vader/analyze`, { text });

    res.json({ text, sentiment: mlRes.data.sentiment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { analyzeFile, analyzeText };