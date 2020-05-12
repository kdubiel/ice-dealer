import bcrypt from 'bcryptjs';
import { UserRole } from 'graphql/utils';
import { Document, model, Schema, Model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 24,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
      maxlength: 320,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: /^[1-9]{1}[0-9]{8}$/,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 64,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['NEW', 'CONFIRMED', 'DELETED'],
      default: 'NEW',
    },
    role: {
      type: String,
      required: true,
      enum: ['CLIENT', 'ADMIN'],
      default: 'CLIENT',
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  status: string;
  role: UserRole;
  resetPasswordToken?: string;
}

interface IUserBase extends IUserSchema {
  setPassword(password: string): void;
}

export interface IUser extends IUserBase {}

export interface IUser_populated extends IUserBase {}

export interface IUserModel extends Model<IUser> {}

UserSchema.pre<IUser>('save', function(next) {
  if (this.isNew) {
    this.setPassword(this.password);
  }
  next();
});

UserSchema.methods.setPassword = function(password: string) {
  this.password = bcrypt.hashSync(password, 12);
  this.resetPasswordToken = undefined;
};

export default model<IUser, IUserModel>('User', UserSchema, 'Users');
