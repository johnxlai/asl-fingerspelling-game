const router = require('express').Router();
const { Result } = require('../../models');
// Controllers
function addResult(request, response) {
  const session = request.session;
  if (session && session.user) {
    Result.create({ user_id: session.user.id, points: request.body.points })
      .then(result => result)
  }
  response.redirect('/');
}
//Routes
router.post('/create', addResult);
module.exports = router;
