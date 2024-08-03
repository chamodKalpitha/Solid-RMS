import rateLimit from "express-rate-limit";
import { PostgresStore } from "@acpr/rate-limit-postgresql";
import "dotenv/config";

const databaseConnection = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 3 requests per `window` (here, per 15 minutes)
  message:
    "Too many accounts created from this IP, please try again after 15 minutes",
  standardHeaders: "draft-7", // Set `RateLimit` and `RateLimit-Policy`` headers
  legacyHeaders: false,
  handler: (req, res, next, options) =>
    res.status(options.statusCode).json({
      status: "error",
      message: options.message,
    }),
  store: new PostgresStore(databaseConnection, "aggregated_store"),
});
