const router = require('express').Router();
const { Result, User } = require('../../models');
// Controllers
function addResult(request, response) {
  const session = request.session;
  if (session && session.user) {
    const body = request.body;
    let level = Math.floor(((parseInt(body.total_points) + body.points) / 100) + 1);
    (async () => {
       await Result.create({ user_id: session.user.id, points: body.points })
       await User.update({level: level}, {where: {id: session.user.id}})
    })()
    }  
  response.redirect('/')
}

//Routes
router.post('/create', addResult);
module.exports = router;
