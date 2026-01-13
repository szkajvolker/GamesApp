export const protectOwnUser = (req, res, next) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (req.user.role === "admin") return next();

  if (req.user._id.toString() !== req.params.id) {
    return res.status(403).json({ message: "Not allowed" });
  }
  next();
};
