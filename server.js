import express from 'express';
import { engine } from 'express-handlebars';

const exphbs = require('express-handlebars');

// Connection with the helpers, creat carpet utils to add 'helpers.js' file
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Secret',
    cookie: {},
    rease: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequilze,
    }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Create carptet 'controllers' to add the routes files
app.use(routes);

sequilze.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})
