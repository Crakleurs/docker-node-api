import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {config} from "~/config";

export const JwtHandler = (req: Request, res: Response, next: NextFunction) => {

  let token = req.headers.authorization;

  if (!token)
    return res.status(403).send("TOKEN IS MISSING");

  token = token.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    res.locals.user = payload;
    next();
  } catch (e) {
    res.status(403).send("TOKEN IS INCORRECT")
  }
}

export const AdminHandler = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (user.role != "ADMIN")
    return res.status(403).send("USER NEED TO BE GRANTED AS ADMIN");

  next();
}

export const UserHandler = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (user.role != "ADMIN" && user.role != "USER")
    return res.status(403).send("READER NEED TO BE GRANTED AS ADMIN");

  next();
}
