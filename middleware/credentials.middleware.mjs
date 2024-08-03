const allowedOrigins = ["http://www.wwsadas.com"];

export default function credentials(req, res, next) {
  console.log("Hit credentials");
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
}
