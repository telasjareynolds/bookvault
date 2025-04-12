import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import { errorHandler, routeMiddleware } from "./middleware";
import { clientUse } from "./utils/valid-ip-scope";
dotenv.config();

const app = express();
const router = Router();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(
    '📚 Welcome to the BookVault API! Try <a href="/books">/books</a> to see available books.'
  );
});

// Add health route here
app.get("/health", (_req, res) => {
  res.status(200).send("OK");
});

// Middleware
app.use(clientUse()); // IP middleware
app.use(routeMiddleware); // logs req info

app.use("/hello", (_req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/books", bookRoutes);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
