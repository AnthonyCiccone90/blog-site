// Logout route
router.post("/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });
  
  module.exports = router;