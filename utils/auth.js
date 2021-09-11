//this is middleware that will re direct a user if they try to access certain paths without being logged in
const auth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = auth;