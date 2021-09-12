//imports
const express = require('express');
const sequelize = require('./config/connection')
const routes = require('./controllers')
const path = require('path')
const app = express();
const helpers = require('./utils/helpers');
const PORT = process.env.PORT || 3001;

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//view engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//session
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: '53cr37',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 5, //checks if user is idle every 5 minutes
    expiration: 1000 * 60 * 15 //if user is idle for 15 minutes the session ends
  }),

};
//

app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});