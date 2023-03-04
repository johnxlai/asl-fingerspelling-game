const router = require('express').Router();
const { Result } = require('../../models');
// Controllers
function addResult(request, response) {
  const session = request.session;
  if (session && session.user) {
    console.log(session.user.id);
    Result.create({ user_id: session.user.id, points: request.body.points })
      .then((result) => {
        console.log('RESULT: ', result);
        return result;
      })
      .then((result) => {
        response.json(result);
      });
  }
  response.redirect('/');
}
//Routes
router.post('/create', addResult);
module.exports = router;
