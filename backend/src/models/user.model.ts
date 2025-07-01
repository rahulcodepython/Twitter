import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    banner: {
        type: String,
        required: false,
    },
    bio: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: false, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
    toJSON: {
        virtuals: true, // Include virtuals in JSON output
        getters: true, // Apply getters to JSON output
    },
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);