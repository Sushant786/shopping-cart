const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoClient = require('./services/mongoClient');
const routes = require('./routes');
const session = require('express-session');
const MongoConnectStore = require('connect-mongo')(session);
const HTTP_SERVER_PORT = 9000;

MongoClient.connectDB();

const app = express();
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoConnectStore({ mongooseConnection: MongoClient.connection() }),
  cookie: { maxAge: 60 * 60 * 1000 }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Shopping Cart Exercise');
});

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(HTTP_SERVER_PORT, () => {
  console.info(`Server is now running on http://localhost:${HTTP_SERVER_PORT}`);
})

module.exports = app;
