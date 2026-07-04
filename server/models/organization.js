import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    logo: {
        url: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    plan: {
      type: String,
      enum: ["free", "starter", "professional", "enterprise"],
      default: "free",
    },

    status: {
      type: String,
      enum: ["active", "suspended", "cancelled"],
      default: "active",
    },

    settings: {
      allowCustomerPortal: {
        type: Boolean,
        default: true,
      },

      allowEmailTickets: {
        type: Boolean,
        default: true,
      },

      ticketPrefix: {
        type: String,
        default: "TKT",
      },

      timezone: {
        type: String,
        default: "Africa/Johannesburg",
      },
    },
    isVerified:{
      type: Boolean,
      default: false
    },
    verificationCode:{
      type: String
    },
    verificationCodeExpiresAt:{
      type: Date
    }

  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Organization", organizationSchema);