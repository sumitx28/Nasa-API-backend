const router = require('express').Router();

const NASA_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;

router.get('/image', async (req, res) => {
  try {
    const result = await fetch(NASA_URL);
    const data = await result.json();
    return res.json(data);
  } catch (error) {
    return res.status(403).json(error);
  }
});

module.exports = router;
