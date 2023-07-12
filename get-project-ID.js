const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

const accessToken = process.env.accessToken;

app.post('/fetch-project-id', async (req, res) => {
  try {
    const response = await axios.get('https://app.asana.com/api/1.0/projects', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const projects = response.data.data;
    console.log('Projects:');
    projects.forEach(project => {
      console.log('Project ID:', project.gid);
      console.log('Project Name:', project.name);
      console.log('---');
    });
    res.json({projects: projects });
  } catch (error) {
    console.error('Error sending bug to Asana:', error);
    res.status(500).json({ error: 'Failed to send bug to Asana' });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});