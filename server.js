// Add dependencies
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const session = require('./config/session');
const path = require('path');

//Connection
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

//init express
const app = express();
const PORT = process.env.PORT || 3002;
const hbs = exphbs.create({ helpers });

app.use(session);
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add the route of path to public
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
