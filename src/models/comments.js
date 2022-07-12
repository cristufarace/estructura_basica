const mongoose = require ("mongoose")
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    comments: { type: String, required: true },
    date: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model ('Comments', UserSchema)