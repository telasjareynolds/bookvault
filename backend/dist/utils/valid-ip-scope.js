"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientInspector = exports.clientUse = exports.validateIp = void 0;
// Basic regex check for IPv4 and IPv6 formats
const simpleIpRegex = /^(::ffff:)?((25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|\d\d|\d)$|^(([a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4})$/;
const validateIp = (ip) => {
    if (!ip)
        return { isValid: false, reason: "IP is empty" };
    const valid = simpleIpRegex.test(ip);
    return {
        isValid: valid,
        reason: valid ? undefined : "Invalid IP format",
    };
};
exports.validateIp = validateIp;
const clientUse = () => {
    return (req, res, next) => {
        const { isValid, reason } = (0, exports.validateIp)(req.ip);
        if (!isValid) {
            res.status(403).json({ error: reason || "Invalid IP" });
            return;
        }
        next();
    };
};
exports.clientUse = clientUse;
const clientInspector = (req) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        method: req.method,
        time: new Date().toISOString(),
    };
});
exports.clientInspector = clientInspector;
