import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";
import { TokenPayload } from "../types";

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, jwtConfig.accessSecret, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, jwtConfig.refreshSecret, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, jwtConfig.accessSecret);
  return decoded as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, jwtConfig.refreshSecret);
  return decoded as TokenPayload;
};
