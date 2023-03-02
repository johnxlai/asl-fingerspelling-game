const router = require('express').Router();
const { User } = require('../../models');

// Controllers

function addUser(request, response){
    User.create(request.body)
    .then(data => {
        const session = request.session
        session.save(() => {
            session.user_id = data.id;
            session.username = data.username;
            session.loggedIn = true;

            response.json(data);
        });
    })
    .catch(error => {response.status(500).json(error)});

    console.log('User was created');
};

function getLoginPage(request, response){
    response.render('login')
}

function login(request, response){
    const session = request.session
    User.findOne({where: {username: request.body.username}})
        .then(data => {
            if (data === null) {
                response.status(404).json("User does not exist! Try to use other username or password")
                return
            }
            const validPassword = data.checkPassword(request.body.password);

            if(!validPassword){
                response.status(400).json({message: 'Incorrect password!'})
            }else{
                session.save(() => {
                    session.user_id = data.id;
                    session.username = data.username;
                    session.loggedIn = true;
    
                    response.json({user: data, message: 'You are logged in!'});
                });
            }
        
        });
    }

function getSignUpPage(request, response){
        response.render('signup')
    }
  
// Routes

router.get('/login', getLoginPage)
  
router.post('/login', login)

router.get('/create/', getSignUpPage)

router.post('/create/', addUser)

module.exports = router;
  

