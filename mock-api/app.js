/*
    HOW TO EXPRESS
    Start here. This app was build using a generator, so here's a lot of auto-generated code we don't have to care about.

    To map requests (GET and POST request from browsers etc), express uses routes. There are essentially JS-functions
    Express will invoke when the right url is used.
    For modularity, app.js only references other Route-files, which can one or more methods. For example, app.use('/users', ...);
    forwards the call to the users-router. From there, this router may add more joints to the url. For instance, if users
    has app.use('/login', ...) and app.use('/logoff, ....), domain.org/users/logon will work, even though only users is
    specified here.

    In app.js, we only need to care about using the correct app.use(...) to achieve the desired links.

    Examples:
        - Route-function: /routes/kpi_metadata.js
        - Reading/writing to DB: /utilities/db-writer.js
 */

var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const buildingkpi = require("./routes/building_kpi")
const neighbourhoodkpi = require("./routes/neighbourhoodkpi")
const demoCKPI = require("./routes/ckpi")
const demoRKPI = require("./routes/rkpi")


const check_token = require("./middleware/check_token_validity")
const check_auth = require("./middleware/check_auth")

const kpi_list = require('./routes/kpi_metadata');
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json({limit: '1000kb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(bodyParser.json({limit: '1000kb'}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use(check_token)
app.use('/kpi-list', kpi_list);
app.use('/buildingkpi', buildingkpi)
app.use("/neighborhoodkpi", neighbourhoodkpi)
app.use("/ckpi", demoCKPI)
app.use("/rkpi", demoRKPI)

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



module.exports = app;
