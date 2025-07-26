import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

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

export const analyzeFile = async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const text = await extractText(file);
    const analysis = analyzeSentiment(text);

    // Return the response in the format expected by frontend
    res.json({ 
      extractedText: text, 
      sentiment: analysis // Pass the entire analysis object as 'sentiment'
    }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    fs.unlinkSync(file.path);
  }
};

function analyzeSentiment(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];

  // Enhanced sentiment word lists
  const sentimentLexicon = {
    positive: {
      strong: ['excellent', 'outstanding', 'exceptional', 'magnificent', 'superb', 'fantastic', 'brilliant', 'amazing', 'wonderful', 'perfect'],
      moderate: ['good', 'great', 'nice', 'happy', 'pleased', 'satisfied', 'successful', 'effective', 'beneficial', 'favorable'],
      mild: ['okay', 'fine', 'decent', 'acceptable', 'reasonable', 'adequate', 'suitable', 'positive', 'helpful', 'useful']
    },
    negative: {
      strong: ['terrible', 'awful', 'horrible', 'disgusting', 'atrocious', 'dreadful', 'appalling', 'devastating', 'disastrous', 'catastrophic'],
      moderate: ['bad', 'poor', 'disappointing', 'frustrating', 'annoying', 'problematic', 'concerning', 'troubling', 'unsatisfactory', 'inadequate'],
      mild: ['difficult', 'challenging', 'concerning', 'questionable', 'doubtful', 'uncertain', 'risky', 'limited', 'slow', 'minor']
    }
  };

  let sentimentScore = 0;
  let sentimentWords = 0;
  const foundWords = { positive: [], negative: [] };

  // Analyze each word with weighted scoring
  words.forEach(word => {
    // Check positive words
    Object.entries(sentimentLexicon.positive).forEach(([intensity, wordList]) => {
      if (wordList.includes(word)) {
        const weight = intensity === 'strong' ? 3 : intensity === 'moderate' ? 2 : 1;
        sentimentScore += weight;
        sentimentWords++;
        foundWords.positive.push({ word, intensity, weight });
      }
    });

    // Check negative words
    Object.entries(sentimentLexicon.negative).forEach(([intensity, wordList]) => {
      if (wordList.includes(word)) {
        const weight = intensity === 'strong' ? 3 : intensity === 'moderate' ? 2 : 1;
        sentimentScore -= weight;
        sentimentWords++;
        foundWords.negative.push({ word, intensity, weight });
      }
    });
  });

  // Calculate normalized sentiment score (-1 to +1)
  const normalizedScore = sentimentWords > 0 ? Math.max(-1, Math.min(1, sentimentScore / (sentimentWords * 2))) : 0;
  
  // Determine sentiment category
  let sentiment = 'neutral';
  if (normalizedScore > 0.1) sentiment = 'positive';
  else if (normalizedScore < -0.1) sentiment = 'negative';

  // Calculate confidence based on number of sentiment words found
  const confidence = Math.min(95, Math.max(50, (sentimentWords / words.length) * 100 + 40));

  const averageWordsPerSentence = sentences.length > 0 ? Math.round(words.length / sentences.length) : 0;

  return {
    sentiment,
    score: Math.round(normalizedScore * 100) / 100,
    confidence: Math.round(confidence),
    wordCount: words.length,
    sentenceCount: sentences.length,
    positiveWords: foundWords.positive.length,
    negativeWords: foundWords.negative.length,
    sentimentWordsFound: sentimentWords,
    averageWordsPerSentence: averageWordsPerSentence,
    detailedAnalysis: {
      positiveTerms: foundWords.positive,
      negativeTerms: foundWords.negative,
      textLength: text.length,
      averageWordsPerSentence: averageWordsPerSentence
    }
  };
}