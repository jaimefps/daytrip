const Authentication = require('./controllers/authentication');
const tripsHandler = require('./controllers/trips-handler');
const userHandler = require('./controllers/user-handler');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
  app.get('/trips/:username' /* requireSignin*/, tripsHandler.getTrips);
  app.get('/trips' /* requireSignin*/, tripsHandler.getTrips);
  app.post('/trips' /* requireSignin*/, tripsHandler.postTrips);
  app.put('/trips', tripsHandler.putTrips);
  app.get('/user', userHandler.getUserInfo);
  app.put('/user', userHandler.putUserInfo); 
};
