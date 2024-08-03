const allowedOrigins = ["http://localhost:3500"];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Hit cors congig");
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
