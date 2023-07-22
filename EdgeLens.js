const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });  // Multer configuration for file uploads
const app = express();

app.use(express.static('public'));  // To serve the client-side HTML and JS files

app.post('/your-server-side-endpoint', upload.single('image'), async (req, res) => {
  try {
    const imageFilePath = req.file.path;
    const file = fs.createReadStream(imageFilePath);

    const formData = new FormData();
    formData.append('image', file);

    const openAIResponse = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/images/generations',
      data: formData,
      headers: {
        'Authorization': 'Bearer your-openai-api-key',
        ...formData.getHeaders(),
      },
    });

    res.json(openAIResponse.data);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
