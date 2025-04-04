import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import Book, { IBook } from "../models/book.model";
import { v4 as uuidv4 } from "uuid";

const GITHUB_BASE =
  "https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // if there were more time for the assignment I'd use the custom error handlers in the errors folder
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });
    
    // Find all default books (owner is null for default books)
    const defaultBooks = await Book.find({ owner: null }).lean<IBook[]>();
    
    const booksToAssign = defaultBooks.map((book) => {
      
      // This turns each Mongoose document into a plain JavaScript object so you can safely modify it
      const { _id, imageLink, ...rest } = book; // Strip _id and pull out links
      return {
        ...rest,
        _id: uuidv4(), // Assigns it to the newly created owner, allowing full access
        owner: user._id as Types.ObjectId,
        // Ensure valid image URL
        imageLink: imageLink?.startsWith("http")
          ? imageLink
          : `${GITHUB_BASE}${imageLink}`,
        // Ensure valid link (optional – only if you're also storing link this way)
        link: book.link,
      };
    });

    // Inserts all the user's copies of the default books into the database
    await Book.insertMany(booksToAssign);

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
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
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration." });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findUserByCredentials(email, password);
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
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
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};
