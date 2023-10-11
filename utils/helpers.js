const isAuthenticated = (req, res, next) => {
  if (req.session.logged_in) {
    return next();
  }

  res.redirect('/login'); // Redirect to the login page if not authenticated
};

module.exports = {
  isAuthenticated,
};
