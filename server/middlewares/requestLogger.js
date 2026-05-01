import pinoHttp from "pino-http";
import logger from "../config/logger.js";

const requestLogger = pinoHttp({
  logger,
  serializers: {
    req(req) {
      return {
        method: req.method,
        url: req.url,
        userId: req.userId,
      };
    },
  },
});

export default requestLogger;
