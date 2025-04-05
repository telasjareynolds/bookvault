import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";
import { NotFoundError, UnauthorizedError } from "../errors/index";
import {
  UNAUTHENTICATED_ERROR_MSG,
  NOTFOUND_ERROR_MSG,
} from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

// CRUD
// Get default books
export const getDefaultBooks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await Book.find({ owner: null });
    const formatted = books.map((book) => ({
      ...book.toObject(),
    }));
    res.status(200).json(formatted);
  } catch (error) {
    console.error("Error getting default books: " + error);
    next(error);
  }
};

// Get User's books specific to their profile
export const getUserProfileBooks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }
  try {
    const owner = new Types.ObjectId(req.user.userId);

    const books = await Book.find({ owner }).sort({ createdAt: -1 });
    const formatted = books.map((book) => ({
      ...book.toObject(),
    }));
    res.status(200).json(formatted);
  } catch (error) {
    next(error);
  }
};

// Create Book
export const createBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }

  try {
    const { title, author, year, imageLink, link } = req.body;
    const book = await Book.create({
      _id: uuidv4(), // Manually assigning as string
      title,
      author,
      year,
      imageLink,
      link,
      owner: new Types.ObjectId(req.user.userId),
    });

    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }
  const updateData = { ...req.body };
  delete updateData.owner;
  const owner = req.user.userId;

  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        owner,
      },
      updateData,
      { new: true }
    );
    if (!book) {
      throw new NotFoundError(NOTFOUND_ERROR_MSG);
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }

  const owner = new Types.ObjectId(req.user.userId);

  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      owner,
    });

    if (!book) {
      throw new NotFoundError(NOTFOUND_ERROR_MSG);
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
