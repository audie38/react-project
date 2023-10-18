const allowedOrigin = process.env.ALLOWED_ORIGINS.split(",") || [];

let isDevelopment = process.env.NODE_ENV == "development";

const corsOptions = {
  origin: (origin, cb) => {
    if (isDevelopment || allowedOrigin.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error("Not Allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
