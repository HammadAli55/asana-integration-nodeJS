const axios = require('axios');

async function getSections() {
  try {
    const accessToken = '1/1204997384918709:6c0f6eb9e5c34e5b5a6d0b0d13d99755'; // Replace with your Asana access token
    const projectId = '1204997431814819'; // Replace with the ID of your project

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
  } catch (error) {
    console.error('Failed to retrieve sections:', error.message);
  }
}

getSections();
