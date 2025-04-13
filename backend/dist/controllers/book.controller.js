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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getUserProfileBooks = exports.getDefaultBooks = void 0;
const mongoose_1 = require("mongoose");
const book_model_1 = __importDefault(require("../models/book.model"));
const index_1 = require("../errors/index");
const constants_1 = require("../utils/constants");
const uuid_1 = require("uuid");
// CRUD
// Get default books
const getDefaultBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_model_1.default.find({ owner: null });
        const formatted = books.map((book) => (Object.assign({}, book.toObject())));
        res.status(200).json(formatted);
    }
    catch (error) {
        console.error("Error getting default books: " + error);
        next(error);
    }
});
exports.getDefaultBooks = getDefaultBooks;
// Get User's books specific to their profile
const getUserProfileBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    try {
        const owner = new mongoose_1.Types.ObjectId(req.user.userId);
        const books = yield book_model_1.default.find({ owner }).sort({ createdAt: -1 });
        const formatted = books.map((book) => (Object.assign({}, book.toObject())));
        res.status(200).json(formatted);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserProfileBooks = getUserProfileBooks;
// Create Book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    try {
        const { title, author, year, imageLink, link } = req.body;
        const book = yield book_model_1.default.create({
            _id: (0, uuid_1.v4)(), // Manually assigning as string
            title,
            author,
            year,
            imageLink,
            link,
            owner: new mongoose_1.Types.ObjectId(req.user.userId),
        });
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    const updateData = Object.assign({}, req.body);
    delete updateData.owner;
    const owner = req.user.userId;
    try {
        const book = yield book_model_1.default.findOneAndUpdate({
            _id: req.params.id,
            owner,
        }, updateData, { new: true });
        if (!book) {
            throw new index_1.NotFoundError(constants_1.NOTFOUND_ERROR_MSG);
        }
        res.status(200).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new index_1.UnauthorizedError(constants_1.UNAUTHENTICATED_ERROR_MSG);
    }
    const owner = new mongoose_1.Types.ObjectId(req.user.userId);
    try {
        const book = yield book_model_1.default.findOneAndDelete({
            _id: req.params.id,
            owner,
        });
        if (!book) {
            throw new index_1.NotFoundError(constants_1.NOTFOUND_ERROR_MSG);
        }
        res.status(200).json({ message: "Book deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
