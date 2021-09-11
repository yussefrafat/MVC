const express = require('express');
const sequelize = require('./config/connection')
const routes = require('./controllers')
const path = require('path');
const exp = require('constants');
const app = express();
const helpers = require('./utils/helpers');
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const exphbs = require('express-handlebars');
const { Console } = require('console');
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

const sess = {
    secret: '53cr37',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 5,
        expiration: 1000 * 60 * 15
    }),
};

app.use(session(sess));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('Now listening'));
});