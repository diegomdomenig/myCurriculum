const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "http://mycurriculum.info/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        if (profile._json.hasOwnProperty('hd')) {
            if (profile._json.hd === "milton.edu") {
                User.find({ googleId: profile.id }).then(users => {
                    if (users.length == 0) {
                        const user = new User({
                            googleId: profile.id,
                            name: profile._json.name,
                            email: profile._json.email,
                            rank: 'Newbie',
                            anonymous: false,
                            reviews: 0,
                            upvotesGiven: 0,
                            upvotesReceived: 0,
                            imgLink: profile._json.picture
                        });
                        user.save().then(result => {
                            return done(null, result);
                        })
                    } else {
                        return done(null, users[0])
                    }
                })
            } else {
                return done(null, false, { message: 'Please sign in with your Milton e-mail' });
            }
        } else if (profile._json.email === "diegomdomenig@gmail.com") {
            User.find({ googleId: profile.id }).then(users => {
                if (users.length == 0) {
                    const user = new User({
                        googleId: profile.id,
                        name: profile._json.name,
                        email: profile._json.email,
                        rank: 'Admin',
                        anonymous: false,
                        reviews: 0,
                        upvotesGiven: 0,
                        upvotesReceived: 0,
                        imgLink: profile._json.picture
                    });
                    user.save().then(result => {
                        return done(null, result);
                    })
                } else {
                    return done(null, users[0])
                }
            })
        } else {
            return done(null, false, { message: 'Please sign in with your Milton e-mail' });
        }
    }
));