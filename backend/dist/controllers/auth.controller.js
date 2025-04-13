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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromCollection = exports.addToCollection = exports.getProfile = exports.login = exports.register = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const book_model_1 = __importDefault(require("../models/book.model"));
const uuid_1 = require("uuid");
const index_1 = require("../errors/index");
const constants_1 = require("../utils/constants");
const GITHUB_BASE = "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/";
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        // Check if user already exists
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            // if there were more time for the assignment I'd use the custom error handlers in the errors folder
            res.status(400).json({ message: "User already exists" });
            return;
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        // Create new user
        const user = yield user_model_1.default.create({
            email,
            password: hashedPassword,
            name,
        });
        // Find all default books (owner is null for default books)
        const defaultBooks = yield book_model_1.default.find({ owner: null }).lean();
        const booksToAssign = defaultBooks.map((book) => {
            // This turns each Mongoose document into a plain JavaScript object so you can safely modify it
            const { _id, imageLink } = book, rest = __rest(book, ["_id", "imageLink"]); // Strip _id and pull out links
            return Object.assign(Object.assign({}, rest), { _id: (0, uuid_1.v4)(), owner: user._id, 
                // Ensure valid image URL
                imageLink: (imageLink === null || imageLink === void 0 ? void 0 : imageLink.startsWith("https"))
                    ? imageLink
                    : `${GITHUB_BASE}${imageLink}`, 
                // Ensure valid link (optional – only if you're also storing link this way)
                link: book.link });
        });
        // Inserts all the user's copies of the default books into the database
        yield book_model_1.default.insertMany(booksToAssign);
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(201).json({
            message: "User created successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res
            .status(500)
            .json({ message: "Something went wrong during registration." });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find user
        const user = yield user_model_1.default.findUserByCredentials(email, password);
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Check password
        const isValidPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Generate token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.json({
            message: "Logged in successfully",
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)
            .select("-password")
            .populate("savedBooks");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getProfile = getProfile;
// Add book to user's collection
const addToCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    try {
        const bookId = req.params.id;
        if (!bookId) {
            throw new index_1.BadRequestError(constants_1.ID_BADREQUEST_MSG);
        }
        const user = yield user_model_1.default.findByIdAndUpdate(req.user.userId, { $addToSet: { savedBooks: bookId } }, // setting this way to prevent duplicates
        { new: true })
            .populate("savedBooks");
        if (!user) {
            throw new index_1.NotFoundError(constants_1.NOTFOUND_ERROR_MSG);
        }
        res.status(200).json(user.savedBooks);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.CastError) {
            return next(new index_1.BadRequestError(constants_1.ID_BADREQUEST_MSG));
        }
        else {
            next(error);
        }
    }
});
exports.addToCollection = addToCollection;
// Remove book from collection
const removeFromCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    try {
        const bookId = req.params.id;
        if (!bookId) {
            throw new index_1.BadRequestError(constants_1.ID_BADREQUEST_MSG);
        }
        const user = yield user_model_1.default.findByIdAndUpdate(req.user.userId, { $pull: { savedBooks: bookId } }, // $pull: remove bookId from savedBooks array and avoid duplicates
        { new: true }).populate("savedBooks");
        if (!user) {
            throw new index_1.NotFoundError(constants_1.NOTFOUND_ERROR_MSG);
        }
        res.status(200).json(user.savedBooks);
    }
    catch (error) {
        if (error instanceof mongoose_1.default.Error.CastError) {
            return next(new index_1.BadRequestError(constants_1.ID_BADREQUEST_MSG));
        }
        else {
            next(error);
        }
    }
});
exports.removeFromCollection = removeFromCollection;
