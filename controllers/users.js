const {validationResult} = require('express-validator')

exports.getAccount = (req, res, next) => {
    res.render('account', {
        pageTitle: 'Account',
        user: req.user
    });
}

exports.postAnonymous = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.redirect("https://youtu.be/L_jWHffIx5E?t=37");
    } else {
        req.user.changeAnonymous(req.body.anonymous === "on")
        .then(result => {
            res.status(204).send();
        })
        .catch(err => {
            console.log(err);
        })
    }
}