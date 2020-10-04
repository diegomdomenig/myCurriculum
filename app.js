const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session')
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const flash = require('connect-flash');
require('./util/passport-setup');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');
const reviewsRoutes = require('./routes/add-review');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/user')


const errorConroller = require('./controllers/error');
const User = require('./models/user');

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
);

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["* 'unsafe-inline'"],
        scriptSrc: ["'self'", "http://* 'unsafe-inline'"],
      },
    })
);
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    name: 'myCurriculum',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session());
app.use(flash());

app.use(loginRoutes);
app.use(reviewsRoutes);
app.use(homeRoutes);
app.use('/admin', adminRoutes);
app.use(userRoutes);


app.use(errorConroller.get404);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@miltoncourses.pkrbw.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(result => {
        app.listen(process.env.PORT || 3000);
    }).catch(err => {
        console.log(err);
    })