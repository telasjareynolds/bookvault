import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  savedBooks: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Using select to hide password
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    savedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.findUserByCredentials = function (
  email: string,
  password: string
) {
  return this.findOne({ email })
    .select("+password")
    .then((user: IUser | null) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched: boolean) => {
          if (!matched) {
            return Promise.reject(
              new UnauthorizedError("Incorrect email or password")
            );
          }
          return user;
        });
    });
};

export interface UserModel extends mongoose.Model<IUser> {
  findUserByCredentials(email: string, password: string): Promise<IUser>;
}

export default mongoose.model<IUser, UserModel>("User", userSchema);
