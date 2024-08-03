export default function checkRole(roles) {
  return (req, res, next) => {
    if (req.isAuthenticated() && roles.includes(req.user.role)) {
      return next();
    }
    res.status(403).json({ status: "error", message: "Forbidden to access" });
  };
}
