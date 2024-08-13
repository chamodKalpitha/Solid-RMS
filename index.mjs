import express from "express";
import router from "./route/index.route.mjs";
import passport from "passport";
import cookieParser from "cookie-parser";
import credentials from "./middleware/credentials.middleware.mjs";
import cors from "cors";
import corsOptions from "./config/cors.config.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./config/swagger.config.mjs";
import rateLimiter from "./middleware/rateLimiter.middleware.mjs";
import "./middleware/passport-jwt.middleware.mjs";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3550;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(rateLimiter);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).send({
    status: "error",
    message: ["Route not found"],
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({
      status: "error",
      message: ["Invalid JSON format"],
    });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}..`);
});
