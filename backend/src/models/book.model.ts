import mongoose, { Document, Schema } from "mongoose";
import validator = require("validator");

export interface IBook extends Document {
  _id: string;
  owner: mongoose.Schema.Types.ObjectId;
  title: string;
  author?: string;
  year: number;
  imageLink: string;
  link?: string;
}

const bookSchema = new Schema<IBook>({
  _id: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  author: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: true,
    minlength: 2,
    maxlength: 4,
  },
  imageLink: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return validator.isURL(v);
      },
      message: "You must enter a valid URL",
    },
  },
  link: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, 
});

bookSchema.index({ _id: 1, owner: 1 }, { unique: true });

export default mongoose.model<IBook>("Book", bookSchema);
