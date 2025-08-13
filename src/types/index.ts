import { Request } from "express";
import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

export interface TokenPayload {
  userId: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    username: string;
    email: string;
  };
  accessToken?: string;
  refreshToken?: string;
}
