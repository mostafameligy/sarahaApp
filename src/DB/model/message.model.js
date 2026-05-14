import mongoose from "mongoose";

const messageSchame = mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  image: {
    type: String
  },
  receverId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
});

export const messageModel = mongoose.model("message", messageSchame);
