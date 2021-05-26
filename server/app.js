var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs')

var key = fs.readFileSync(__dirname + '/certs/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/certs/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

const uri = 'mongodb+srv://restServer:9uDnRKA2phuLUZw4@bookwormcluster.e8exi.mongodb.net/pz-2021-bookworm-app?retryWrites=true&w=majority'
// Useless bez whitelisty IP
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to DB");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var genresRouter = require('./routes/genres');
var userBookRouter = require('./routes/userBooks');
var reviewsRouter = require('./routes/reviews');
var genreRequestsRouter = require('./routes/genreRequests');


const app = express();
const port = 9000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/books/genres', genresRouter);
app.use('/user-books', userBookRouter);
app.use('/reviews', reviewsRouter);
app.use('/books/genres/requests', genreRequestsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //next(createError(404));
  res.status(404).send("Resource does not exist")
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

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Express server listening at https://localhost:${port}`)
})


module.exports = app;
