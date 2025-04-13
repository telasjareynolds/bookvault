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
exports.routeMiddleware = void 0;
const utils_1 = require("../utils");
const valid_ip_scope_1 = require("../utils/valid-ip-scope"); // ✅ fixed path
const routeMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.path !== "/health") {
        let clientInfo = {};
        try {
            const ipValidation = (0, valid_ip_scope_1.validateIp)(req.ip);
            if (ipValidation.isValid) {
                clientInfo = yield (0, valid_ip_scope_1.clientInspector)(req);
            }
            else {
                clientInfo = { error: ipValidation.reason };
            }
        }
        catch (err) {
            console.error("Error in routeMiddleware IP inspection:", err);
            clientInfo = { error: "Failed to inspect client IP" };
        }
        utils_1.Logger.group({
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
});
exports.routeMiddleware = routeMiddleware;
