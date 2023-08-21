const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4000; // Use a port of your choice

// Set up CORS headers to allow requests from your client app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your client's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/read_file', async (req, res) => {
  try {
    // Make a request to the remote server
    const response = await axios.get('https://work247.vn/api_crm/read_file.php');
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || 'Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
