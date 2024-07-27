import express from "express";
import "dotenv/config";
import router from "./route/index.route.mjs";

const app = express();
const PORT = process.env.PORT || 3550;
app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.status(404).send({
    status: "error",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on ${PORT}..`);
});
