"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const personSchema = new mongoose_1.default.Schema({
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
        const timestamp = Date.now();
        const date = new Date(timestamp);
        if (!this.createdAt) {
            this.createdAt = date;
        }
        this.updatedAt = date;
    }
    next();
});
const Person = mongoose_1.default.model("Person", personSchema);
exports.default = Person;
