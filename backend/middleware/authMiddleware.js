import jwt from "jsonwebtoken";

export const fetchUser = async (req, res, next) => {
  // Middleware logic to fetch user from token
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate with a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate with a valid token" });
    }
  }
};
