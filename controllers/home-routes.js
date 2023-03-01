const router = require('express').Router();
const { User } = require('../models');
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
  // try {
  const userData = await User.findAll({
    attributes: ['username'],
  });

  // const user = userData.get({ plain: true });

  console.log(userData);

  // Get all projects and JOIN with user data
  // const projectData = await Project.findAll({
  //   include: [
  //     {
  //       model: User,
  //       attributes: ['name'],
  //     },
  //   ],
  // });

  res.render('start', {
    userData,
  });

  // } catch (err) {
  // res.status(500).json(err);
  // }
});

module.exports = router;
