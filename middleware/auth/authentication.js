function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("user not authorised");
}

module.exports = ensureAuthenticated;
