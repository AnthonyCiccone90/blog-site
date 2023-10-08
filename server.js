const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET, // Use a secure, randomly generated secret
  cookie: {
    maxAge: 3600000, // Set an appropriate session timeout
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in;
  res.locals.userId = req.session.user_id;
  next();
});

app.set("views", path.join(__dirname, "views"));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
