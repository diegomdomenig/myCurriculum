exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.rank === 'Admin') {
        next();
    } else {
        res.status(404).render('404', { pageTitle: 'Page Not Found' });
    }
}