import rateLimit from "express-rate-limit";
import { PostgresStore } from "@acpr/rate-limit-postgresql";
import "dotenv/config";

const dbString = process.env.DATABASE_URL;
const parsedUrl = parseDatabaseUrl(dbString);

const databaseConnection = {
  user: parsedUrl.username,
  password: parsedUrl.password,
  host: parsedUrl.host,
  database: parsedUrl.database,
  port: parsedUrl.port,
  ssl: {
    rejectUnauthorized: false, // Set to true in production for better security
  },
};

export default rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
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

function parseDatabaseUrl(url) {
  const urlPattern = /^(postgresql):\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/;
  const match = url.match(urlPattern);

  if (match) {
    return {
      protocol: match[1],
      username: match[2],
      password: match[3],
      host: match[4],
      port: parseInt(match[5], 10),
      database: match[6],
    };
  } else {
    throw new Error("Invalid DATABASE_URL format");
  }
}
