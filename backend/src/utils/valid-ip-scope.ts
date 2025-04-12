import { Request, Response, NextFunction } from "express";
// @ts-ignore
const clientIpValidator = require("is-ip");

const LOCALHOST_IPS: readonly string[] = [
  "::1",
  "::ffff:127.0.0.1",
  "127.0.0.1",
];

export const validateIp = (ip: string | undefined): { isValid: boolean; reason?: string } => {
  if (!ip) return { isValid: false, reason: "IP is empty" };
  if (LOCALHOST_IPS.includes(ip)) return { isValid: false, reason: "Localhost IP not allowed" };

  const valid = clientIpValidator(ip);
  return {
    isValid: valid,
    reason: valid ? undefined : "Invalid IP format",
  };
};

export const clientUse = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { isValid, reason } = validateIp(req.ip);
    if (!isValid) {
      res.status(403).json({ error: reason || "Invalid IP" });
      return;
    }
    next();
  };
};

export const clientInspector = async (req: Request) => {
  return {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    method: req.method,
    time: new Date().toISOString(),
  };
};
