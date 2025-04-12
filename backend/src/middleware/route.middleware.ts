import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils";
import { clientInspector, validateIp } from "../utils/valid-ip-scope"; // ✅ fixed path

export const routeMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.path !== "/health") {
    let clientInfo = {};
    try {
      const ipValidation = validateIp(req.ip);

      if (ipValidation.isValid) {
        clientInfo = await clientInspector(req);
      } else {
        clientInfo = { error: ipValidation.reason };
      }
    } catch (err) {
      console.error("Error in routeMiddleware IP inspection:", err);
      clientInfo = { error: "Failed to inspect client IP" };
    }

    Logger.group({
      title: "New Request",
      descriptions: [
        {
          description: "URL",
          info: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.url}`,
        },
        { description: "PARAMS", info: req.params },
        { description: "QUERY", info: req.query },
        { description: "BODY", info: JSON.stringify(req.body) },
        { description: "CLIENT INFO", info: JSON.stringify(clientInfo) },
      ],
    });
  }

  next();
};
