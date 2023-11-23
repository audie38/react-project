const allowedOrigin = process.env.ALLOWED_ORIGINS.split(",") || [];
const isDev = process.env.NODE_ENV == "development";

const corsOptions = {
  origin: (origin, cb) => {
    if (isDev) {
      cb(null, true);
    } else {
      if (allowedOrigin.indexOf(origin) !== -1) {
        cb(null, true);
      } else {
        cb(new Error("Not Allowed by CORS"));
      }
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
