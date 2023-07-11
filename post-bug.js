const axios = require('axios');

async function postBug() {
  try {
    const accessToken = '1/1204997384918709:6c0f6eb9e5c34e5b5a6d0b0d13d99755'; // Replace with your Asana access token
    const projectId = '1204997431814819'; // Replace with the ID of your project
    const sectionId = '1204997431814820'; // Replace with the ID of your Todo section

    const bugData = {
      data: {
        name: 'Bug Title',
        notes: JSON.stringify({
          "Host App Version": "1.0.1 (2)",
          "Device Model": "HUAWEI|STK-L21",  
          "DEVICE OS": "Android 10",
          "Reported By": "Hammad"
        }),
        // custom_fields: {
        //   Priority: "Low",
        //   Status: "On track",
        // },
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
  } catch (error) {
    console.error('Failed to post bug:', error.message);
  }
}

postBug();

