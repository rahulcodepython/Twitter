import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["follow", "like", "comment"],
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: false, // Not all notifications will have a post
        default: null, // Default to null if not provided
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false, // Not all notifications will have a comment
        default: null, // Default to null if not provided
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
    toJSON: {
        virtuals: true, // Include virtuals in JSON output
        getters: true, // Apply getters to JSON output
    },

})

export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);