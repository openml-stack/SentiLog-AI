const axios = require("axios");

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
        await axios.post("http://localhost:4000/api/news", entry);
        console.log(`✅ Posted from ${source.name}: ${entry.title}`);
      }
    } catch (err) {
      console.error(`❌ Error from ${source.name}:`, err.message);
    }
  }
};

module.exports = fetchAndPostNews;
