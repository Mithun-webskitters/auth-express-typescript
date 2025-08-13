import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/authController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

// Validation rules
const signupValidation = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/signup", signupValidation, AuthController.signup);
router.post("/login", loginValidation, AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", authenticateToken, AuthController.logout);
router.get("/profile", authenticateToken, AuthController.getProfile);

export default router;
