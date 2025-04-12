const clientIpValidator = require("is-ip");
import { Request, Response, NextFunction } from "express";

const LOCALHOST_IPS: readonly string[] = [
  "::1",
  "::ffff:127.0.0.1",
  "127.0.0.1",
];

export const clientUse = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    if (!ip) return res.status(403).json({ error: "IP is empty" });

    if (LOCALHOST_IPS.includes(ip)) {
      return res.status(403).json({ error: "Localhost IP not allowed" });
    }

    if (!clientIpValidator(ip)) {
      return res.status(403).json({ error: "Invalid IP format" });
    }

    next();
  };
};
