const router = require('express').Router();
//Add sequelize to use sum
const sequelize = require('../config/connection');

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

router.get('/start', async (req, res) => {
  try {
    if (req.session.user) {
      const userData = await User.findByPk(req.session.user.id, {
        attributes: {
          exclude: ['password'],
          include: [
            [
              sequelize.literal(
                `(SELECT SUM(points) FROM result WHERE result.user_id = user.id )`
              ),
              'total_points',
            ],
          ],
        },
        include: [{ model: Result }],
      });
      const user = userData.get({ plain: true });

      res.render('start', {
        ...user,
        loggedIn: req.session.loggedIn,
        user: req.session.user,
      });
      return;
    }
    //if user not logged in
    res.render('start');
  } catch (err) {
    res.status(500).json(err);
  }
});

//Ranking and highscore page
router.get('/ranks', async (req, res) => {
  const session = req.session;
  let is_superuser = false;
  if (session && session.user) {
    is_superuser = session.user.is_superuser;
  }
  // try {
  let usersData = [{ is_superuser: is_superuser }];
  const usersData_ = await User.findAll({
    order: [['level', 'DESC']],
    attributes: {
      exclude: ['password'],
      include: [
        [
          sequelize.literal(
            `(SELECT SUM(points) FROM result WHERE result.user_id = user.id )`
          ),
          'total_points',
        ],
      ],
    },
    include: [{ model: Result, attributes: ['points'] }],
  });

  //loop thru all users and display user
  let users = usersData_.map((user) => user.get({ plain: true }));
  users = usersData.concat(users);
  res.render('ranks', {
    users,
    loggedIn: req.session.loggedIn,
    user: req.session.user,
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

async function getUser(id, req, res) {
  const userData = await User.findByPk(id, {
    attributes: {
      exclude: ['password'],
      include: [
        [
          sequelize.literal(
            `(SELECT SUM(points) FROM result WHERE result.user_id = user.id )`
          ),
          'total_points',
        ],
      ],
    },
    include: [{ model: Result, attributes: ['points'] }],
  });
  const user = userData.get({ plain: true });
  res.render('profile', {
    ...user,
    loggedIn: req.session.loggedIn,
    user: req.session.user,
  });
}

// Profile page (with Auth)
router.get('/profile', async (req, res) => {
  try {
    if (req.session.user) {
      getUser(req.session.user.id, req, res);
    } else {
      res.render('login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    if (req.session.user && req.session.user.superuser) {
      getUser(req.params.id, req, res);
    } else {
      res.render('login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
