const router = require('express').Router();
const { response } = require('express');
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

  // if (req.session.user) {
  //   const userData = await User.findByPk(req.session.user.id, {
  //     attributes: { exclude: ['password'] },
  //     include: [{ model: Result, attributes: ['points'] }],
  //   });
  //   const user = userData.get({ plain: true });

  //   res.render('start', { ...user, loggedIn: req.session.loggedIn });
  // }
  res.render('start', { loggedIn: req.session.loggedIn });

  // } catch (err) {
  // res.status(500).json(err);
  // }
});

//Ranking and highscore page
router.get('/ranks', async (req, res) => {
  try {
    const usersData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Result, attributes: ['points'] }],
    });

    //loop thru all users and display user
    const users = usersData.map((user) => user.get({ plain: true }));
    res.render('ranks', { users, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile page (with Auth)
router.get('/profile', async (req, res) => {
  try {
    if (req.session.user) {
      const userData = await User.findByPk(req.session.user.id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Result, attributes: ['points'] }],
      });
      const user = userData.get({ plain: true });

      res.render('profile', { ...user, loggedIn: req.session.loggedIn });
    } else {
      res.render('login');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
