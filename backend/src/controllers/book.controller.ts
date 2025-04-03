import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Book from "../models/book.model";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index";
import {
  ID_BADREQUEST_MSG,
  FORBIDDEN_ERROR_MSG,
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
// Get User's collected books
export const getBookCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }
  try {
    const books = await Book.find({ owner: req.user.userId });
    const formatted = books.map((book) => ({
      ...book.toObject(),
      _id: uuidv4(), // guarantees string
    }));
    return res.status(200).json(formatted);
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
      owner: req.user.userId,
    });

    return res.status(201).json(book);
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

  try {
    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.userId,
      },
      req.body,
      { new: true }
    );
    if (!book) {
      throw new NotFoundError(NOTFOUND_ERROR_MSG);
    }
    return res.status(200).json(book);
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

  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId,
    });

    if (!book) {
      throw new NotFoundError(NOTFOUND_ERROR_MSG);
    }
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Add book to user's collection
export const addToCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }

  const { _id, title, author, year, imageLink, link } = req.body;
  const owner = req.user.userId;

  if (!_id) {
    throw new BadRequestError(ID_BADREQUEST_MSG);
  }

  try {
    const book = await Book.findOneAndUpdate(
      { _id, owner },
      { _id, title, author, year, imageLink, link },
      { upsert: true, new: true }
    );
    return res.status(200).json(book);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(ID_BADREQUEST_MSG));
    } else {
      next(error);
    }
  }
};

// Remove book from collection
export const removeFromCollection = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedError(UNAUTHENTICATED_ERROR_MSG);
  }

  const { _id } = req.body;
  const owner = req.user.userId;

  if (!_id) {
    throw new BadRequestError(ID_BADREQUEST_MSG);
  }

  try {
    const book = await Book.findOne({ _id, owner });
    if (!book) {
      throw new ForbiddenError(FORBIDDEN_ERROR_MSG);
    }

    await Book.findOneAndDelete({ _id, owner });
    return res
      .status(200)
      .json({ message: "Book removed from collection successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError(ID_BADREQUEST_MSG));
    } else {
      next(error);
    }
  }
};
