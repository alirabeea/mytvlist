import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export default function jwtAuth(req, res, next){
    const token = req.header('token')
    if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: req.header('token')});
  }
}