import mongoose from "mongoose";
import {
  BadRequestException,
  genderEnums,
  providerEnums,
  roleEnums,
} from "../../common/index.js";

const userSchame = new mongoose.Schema(
  {
    fristName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 15,
    },
    profilName: {
      type: String,
      requried: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    BOD: Date,
    gender: {
      type: Number,
      enum: Object.values(genderEnums),
      default: genderEnums.Male,
    },
    provider: {
      type: String,
      enum: Object.values(providerEnums),
      default: providerEnums.System,
    },
    role: {
      type: String,
      enum: Object.values(roleEnums),
      default: roleEnums.User,
    },
    image: {
      type: String,
    },
    isVerifed:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true },
);

userSchame
  .virtual("name")
  .set(function (value) {
    if (!value) {
      this.fristName = "unKnow";
      this.lastName = "unKnow";
      return;
    }
    const [fristName, lastName] = value.split(" ");
    this.fristName = fristName || "unKnow";
    this.lastName = lastName || "unKnow";
  })
  .get(function () {
    return `${this.fristName} ${this.lastName}`;
  });

export const userModel = mongoose.model("User", userSchame);
