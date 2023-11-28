import mongoose from "mongoose";

const travel = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  coordinates:{
    type: [[]],
  }
},{
  timestamps: true
})

export const Travel = mongoose.model('Travel', travel)