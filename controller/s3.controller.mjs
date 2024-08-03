import "dotenv/config";
import fileNameSchema from "../validation/s3.validation.mjs";
import { generateUploadURL } from "../config/awsS3.config.mjs";

export async function getSignedUrl(req, res) {
  const { error, value } = fileNameSchema.validate(req.body);
  const { fileName } = value;

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(400).json({ status: "error", message: errorMessages });
  }

  try {
    const url = await generateUploadURL(fileName);
    return res.status(200).json({
      status: "success",
      data: [url],
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.error(err);
    res
      .status(500)
      .json({ status: "error", message: ["Internal server error"] });
  }
}
