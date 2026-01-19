import jwt from "jsonwebtoken";



export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers.authorization; 

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Missing or invalid Authorization header" });
    }

    const token = header.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = payload.userId;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
