const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', passport.authenticate('google', {
    hd: "milton.edu",
    scope: ['profile', 'email']
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/', failureFlash: true }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

module.exports = router;