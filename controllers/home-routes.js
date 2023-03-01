const router = require('express').Router();

//Get router for home page
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {});
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get Router for Start Game page
router.get('/start', async (req, res) => {
  try {
    res.render('start', {});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
