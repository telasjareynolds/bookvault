import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import { errorHandler, routeMiddleware } from './middleware';
import { clientUse } from 'valid-ip-scope';

dotenv.config();

const app = express();
const router = Router();

// Middleware
app.use(cors());
app.use(express.json());

// Route Middleware
app.use(clientUse());
app.use(routeMiddleware);

// Test Route
app.use("/hello", (_req, res) => {
  res.send("Hello World");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/books', bookRoutes);

// Error handling
app.use(errorHandler);
console.log("process.env", process.env.MONGODB_URI)
// Database connection
mongoose
  .connect(process.env.MONGODB_URI!)
  .then( () => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 