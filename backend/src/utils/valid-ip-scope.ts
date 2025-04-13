import { Request, Response, NextFunction } from "express";

// Basic regex check for IPv4 and IPv6 formats
const simpleIpRegex =
  /^(::ffff:)?((25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)$|^(([a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4})$/;

export const validateIp = (
  ip: string | undefined
): { isValid: boolean; reason?: string } => {
  if (!ip) return { isValid: false, reason: "IP is empty" };

  const valid = simpleIpRegex.test(ip);
  return {
    isValid: valid,
    reason: valid ? undefined : "Invalid IP format",
  };
};

export const clientUse = () => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Allow all IPs in development
    if (process.env.NODE_ENV !== "production") {
      return next();
    }

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
    userAgent: req.headers["user-agent"],
    method: req.method,
    time: new Date().toISOString(),
  };
};
