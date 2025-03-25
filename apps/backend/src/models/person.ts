import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  city: { type: String, trim: true },
  training: { type: String, trim: true },
  technologies: { type: String, trim: true },
  avatarUrl: { type: String, trim: true },
  githubUser: { type: String, trim: true }
});

personSchema.pre("save", function (next) {
  if (this.isModified()) {
    const timestamp: number = Date.now();
    const date: Date = new Date(timestamp);

    if (!this.createdAt) {
      this.createdAt = date;
    }
    this.updatedAt = date;
  }
  next();
});


const Person = mongoose.model("Person", personSchema);

export default Person;
