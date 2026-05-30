import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: String,
      required: false,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


    role: {
      type: String,
      enum: ["Student", "Recruiter"],
      default: "Student",
      required: true,
    },

    profile: {
      bio: {
        type: String,
      },

      skills: [
        {
          type: String,
        },
      ],

      location: {
        type: String,
      },

     
      experience: {
        type: String,
      },

      education: {
        degree: {
          type: String,
        },
        institute: {
          type: String,
        },
        passingYear: {
          type: Number,
        },
      },

      resume: {
        type: String, 
      },

      resumeOriginalname: {
        type: String, 
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },

      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
