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
  const userData = await User.findAll();

  const gamer = userData.map((user) => user.get({ plain: true }));

  console.log(gamer);

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

router.get('/ranks', async (req, res) => {
  const usersData = await User.findAll();
  const user = usersData.map((user) => user.get({ plain: true }));

  console.log(user);
});

module.exports = router;
å;
