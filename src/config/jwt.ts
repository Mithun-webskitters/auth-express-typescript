import dotenv from "dotenv";
dotenv.config();
export const jwtConfig = {
  accessSecret: process.env.JWT_ACCESS_SECRET as string,
  refreshSecret: process.env.JWT_REFRESH_SECRET as string,
  accessExpire: process.env.JWT_ACCESS_EXPIRE || "15m",
  refreshExpire: process.env.JWT_REFRESH_EXPIRE || "7d",
};

// Validate that required secrets are present
if (!process.env.JWT_ACCESS_SECRET) {
  throw new Error("JWT_ACCESS_SECRET environment variable is required");
}

if (!process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT_REFRESH_SECRET environment variable is required");
}
