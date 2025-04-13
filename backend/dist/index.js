"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const middleware_1 = require("./middleware");
const valid_ip_scope_1 = require("./utils/valid-ip-scope");
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = (0, express_1.Router)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send('📚 Welcome to the BookVault API! Try <a href="/books">/books</a> to see available books.');
});
// Add health route here
app.get("/health", (_req, res) => {
    res.status(200).send("OK");
});
// Middleware
app.use((0, valid_ip_scope_1.clientUse)()); // IP middleware
app.use(middleware_1.routeMiddleware); // logs req info
app.use("/hello", (_req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", auth_routes_1.default);
app.use("/books", book_routes_1.default);
app.use(middleware_1.errorHandler);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
    .catch((error) => {
    console.error("MongoDB connection error:", error);
});
