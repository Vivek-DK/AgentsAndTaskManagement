// middleware to allow access based on user roles
const authorize = (...roles) => {
  return (req, res, next) => {

    // check if user's role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    // proceed if role is valid
    next();
  };
};

module.exports = authorize;
