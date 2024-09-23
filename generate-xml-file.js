const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env file

// API request body for the sitemap
const bodyForSiteMap = {
  "search": "",
  "pageNo": 0,
  "pageSize": 1000,
  "sortBy": "",
  "sortOrder": "",
  "filters": {}
};

// Function to generate XML from the API response
const generateXml = async () => {
  const axiosInstance = axios.create({
    baseURL: process.env.GATSBY_BASE_URL,
    headers: {
      Storecode: process.env.GATSBY_STORE_CODE,
      Validkey: process.env.GATSBY_VALID_KEY,
    }
  });

  // Call the API to get sitemap data
  const response = await axiosInstance.post('utility/fksBMEOGVoLiw', bodyForSiteMap);
  const urls = response?.data?.data?.items;
  const baseUrl = process.env.GATSBY_STORE_URL;

  // Generate the XML structure
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach(url => {
    xml += `  <url>\n    <loc>${baseUrl}/${url.linkUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

// Generate a sitemap index linking both the custom sitemap and Gatsby's sitemap
const generateSitemapIndex = () => {
  const baseUrl = process.env.GATSBY_STORE_URL;
  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap>\n    <loc>${baseUrl}/sitemap/sitemap-index.xml</loc>\n  </sitemap>\n` +
    `  <sitemap>\n    <loc>${baseUrl}/custom-sitemap.xml</loc>\n  </sitemap>\n` +
    `</sitemapindex>`;
  
  return sitemapIndex;
};

// Call the function to generate XML
const run = async () => {
  try {
    // Generate the custom sitemap from API data
    const xmlContent = await generateXml();
    
    // Write the custom sitemap to the public folder
    fs.writeFileSync(path.join(process.cwd(), 'public', 'custom-sitemap.xml'), xmlContent);
    console.log('Custom sitemap generated and saved to public/custom-sitemap.xml!');

    // Generate the sitemap index
    const sitemapIndex = generateSitemapIndex();
    
    // Write the sitemap index to the public folder
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap-index.xml'), sitemapIndex);
    console.log('Sitemap index generated and saved to public/sitemap-index.xml!');
    
  } catch (error) {
    console.error('Failed to generate sitemap:', error.message);
  }
};

run();
