const axios = require("axios");
const NewsEntry = require("../models/NewsEntry");
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const GUARDIAN_API_KEY = process.env.GUARDIAN_API_KEY;

const standardizeNews = (article) => ({
  title: article.title || "Untitled",
  url: article.url || "#",
  text: article.text || article.title || "",
  date: article.date || new Date().toISOString(),
});

const newsSources = [
  {
    name: "NewsAPI",
    buildUrl: ({ topic = "", from = "", to = "" }) =>
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        topic
      )}&from=${from}&to=${to}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`,
    transform: (data) =>
      data.articles?.map((a) =>
        standardizeNews({
          title: a.title,
          url: a.url,
          text: a.content || a.description || a.title || "",
          date: a.publishedAt,
        })
      ) || [],
  },
  {
    name: "The Guardian",
    buildUrl: ({ topic = "", from = "", to = "" }) =>
      `https://content.guardianapis.com/search?q=${encodeURIComponent(
        topic
      )}&from-date=${from}&to-date=${to}&show-fields=bodyText&api-key=${GUARDIAN_API_KEY}`,
    transform: (data) =>
      data.response?.results?.map((a) =>
        standardizeNews({
          title: a.webTitle,
          url: a.webUrl,
          text: a.fields?.bodyText || a.webTitle,
          date: a.webPublicationDate,
        })
      ) || [],
  },
];

const fetchAndPostNews = async ({ topic = "India", hours = 36 } = {}) => {
  const to = new Date().toISOString();
  const from = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

  for (const source of newsSources) {
    const url = source.buildUrl({ topic, from, to });

    try {
      const response = await axios.get(url);
      const entries = source.transform(response.data);

      if (entries.length === 0) {
        console.log(`⚠️ No articles found from ${source.name}`);
        continue;
      }

      for (const entry of entries) {
        console.log(entry.url);
        await createNewsEntry(entry.url, entry.title, entry.text, entry.date);
        console.log(`✅ Posted from ${source.name}: ${entry.title}`);
      }
    } catch (err) {
      console.error(`❌ Error from ${source.name}:`, err.message);
    }
  }
};

async function createNewsEntry(url, title, text, date) {
  try {
  
      // Call ML service (running on port 5001) to analyze sentiment and emotion
      // This sends the article text to a Python/ML microservice for analysis
      const mlRes = await axios.post(`${process.env.ML_API_URL}/vader/analyze`, { text });
  
      // Extract sentiment (positive/negative/neutral) and emotion data from ML response
      const { sentiment, emotion } = mlRes.data;
      
  
      // Create new news entry in database with original data + ML analysis results
      await NewsEntry.create({
        url,
        title,
        text,
        sentiment,
        emotion,
        date,
      });
  
    } catch (err) {
      console.error('Error creating news entry:', err.message);
      
    }
}
module.exports = fetchAndPostNews;
