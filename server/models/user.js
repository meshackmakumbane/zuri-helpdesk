import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minlength: 6,
      select: false,
    },

    phone: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["super_admin", "admin", "consultant", "client"],
      default: "client",
    },

    organization: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },
    inviteToken: String,
    inviteTokenExpires: Date,
    inviteAccepted: {
        type: Boolean,
        default: false
    },
    lastLogin: {
      type: Date,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);