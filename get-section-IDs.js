const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

const accessToken = process.env.accessToken;
const projectId = '1204997431814819'; // Replace with the ID of your project

app.post('/fetch-section-id', async (req, res) => {
  try {
    const response = await axios.get(`https://app.asana.com/api/1.0/projects/${projectId}/sections`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const sections = response.data.data;
    console.log('Sections:');
    sections.forEach(section => {
      console.log('Section ID:', section.gid);
      console.log('Section Name:', section.name);
      console.log('---');
    });
    res.json({projects: sections });
  } catch (error) {
    console.error('Error sending bug to Asana:', error);
    res.status(500).json({ error: 'Failed to send bug to Asana' });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});