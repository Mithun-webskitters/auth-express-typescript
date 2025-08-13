import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { AuthRequest, AuthResponse, TokenPayload } from "../types";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";

export class AuthController {
  // User Signup
  static async signup(req: Request, res: Response): Promise<void> {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const { username, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        res.status(409).json({
          success: false,
          message: "User with this email or username already exists",
        });
        return;
      }

      // Create new user
      const user = new User({ username, email, password });
      await user.save();

      // Generate tokens
      const tokenPayload: TokenPayload = {
        userId: user._id,
        email: user.email,
        username: user.username,
      };

      // const accessToken = generateAccessToken(tokenPayload);
      // const refreshToken = generateRefreshToken(tokenPayload);

      // Save refresh token to database
      // user.refreshToken = refreshToken;
      await user.save();

      const response: AuthResponse = {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        // accessToken,
        // refreshToken,
      };

      res.status(201).json(response);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // User Login
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
        return;
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
        return;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
        return;
      }

      // Generate tokens
      const tokenPayload: TokenPayload = {
        userId: user._id,
        email: user.email,
        username: user.username,
      };

      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      // Save refresh token to database
      user.refreshToken = refreshToken;
      await user.save();

      const response: AuthResponse = {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        accessToken,
        refreshToken,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Refresh Token
  static async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          message: "Refresh token required",
        });
        return;
      }

      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);

      // Find user and check if refresh token matches
      const user = await User.findById(decoded.userId);
      if (!user || user.refreshToken !== refreshToken) {
        res.status(403).json({
          success: false,
          message: "Invalid refresh token",
        });
        return;
      }

      // Generate new tokens
      const tokenPayload: TokenPayload = {
        userId: user._id,
        email: user.email,
        username: user.username,
      };

      const newAccessToken = generateAccessToken(tokenPayload);
      const newRefreshToken = generateRefreshToken(tokenPayload);

      // Update refresh token in database
      user.refreshToken = newRefreshToken;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Tokens refreshed successfully",
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      console.error("Refresh token error:", error);
      res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }
  }

  // Logout
  static async logout(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      // Clear refresh token from database
      await User.findByIdAndUpdate(user._id, { refreshToken: null });

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  // Get Current User Profile
  static async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Profile retrieved successfully",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
