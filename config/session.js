require('dotenv').config();

const session = require("express-session");
const { v4: uuidv4 } = require('uuid');
const mysql = require("./connection")

const SequelizeStore = require("connect-session-sequelize")(session.Store);

module.exports = session({
    secret: process.env.DB_SECRET || uuidv4(), 
    cookie: { maxAge: 7200000 },
    resave: false, 
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: mysql,  
        checkExpirationInterval: 1000 * 60 * 10,
        expiration: 1000 * 60 * 30
    }),
  })

  