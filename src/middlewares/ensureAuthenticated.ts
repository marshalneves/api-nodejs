import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from "../errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("JWT token is missing", 400);

  const [, token] = authHeader.split(" ");

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    }
    
    return next();
  } catch {
    throw new AppError("Invalid JWT token", 400);
  }
}
