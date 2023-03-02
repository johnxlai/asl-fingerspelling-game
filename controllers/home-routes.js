const router = require('express').Router();
const { User, Result } = require('../models');
//Get router for home page
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      user: req.session.user,
    });
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

//Ranking and highscore page
router.get('/ranks', async (req, res) => {
  const usersData = await User.findAll({
    attributes: { exclude: ['password'] },
    include: [{ model: Result, attributes: ['points'] }],
  });
  const users = usersData.map((user) => user.get({ plain: true }));

  console.log(users);
  res.render('ranks', { users });
});

// Profile page (with Auth)
router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session, {
      attributes: { exclude: ['password'] },
      include: [{ model: Result, attributes: ['points'] }],
    });

    const user = userData.get({ plain: true });
    res.render('profile', { ...user });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
