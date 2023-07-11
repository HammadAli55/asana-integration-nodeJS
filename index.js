const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

const accessToken = process.env.accessToken;
const projectId = '1204997431814819';
const sectionId = '1204997431814820';


app.post('/bugs', async (req, res) => {
  console.log("accessToken", typeof(accessToken));
  console.log("accessToken", accessToken);
  const { title, description } = req.body;

  try {
    const bugData = {
      data: {
        name: title,
        notes: JSON.stringify(description),
        projects: [projectId],
        memberships: [{
          project: projectId,
          section: sectionId,
        }],
      },
    };

    const response = await axios.post('https://app.asana.com/api/1.0/tasks', bugData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Bug posted successfully!');
    console.log('Bug ID:', response.data.data.gid);
    res.json({ message: 'Bug sent to Asana', taskId: response.data.data.id });
  } catch (error) {
    console.error('Error sending bug to Asana:', error);
    res.status(500).json({ error: 'Failed to send bug to Asana' });
  }
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});