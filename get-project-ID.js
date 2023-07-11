const axios = require('axios');

async function getAllProjects() {
  try {
    const accessToken = '1/1204997384918709:6c0f6eb9e5c34e5b5a6d0b0d13d99755'; // Replace with your Asana access token

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
  } catch (error) {
    console.error('Failed to retrieve projects:', error.message);
  }
}

getAllProjects();

