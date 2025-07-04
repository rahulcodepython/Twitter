import { getAuth } from "@clerk/express";
import expressAsyncHandler from "express-async-handler";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";

export const getPosts = expressAsyncHandler(async (req, res) => {
    const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName avatar")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName avatar",
            },
        });

    res.status(200).json({ posts });
});

export const getPost = expressAsyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId)
        .populate("user", "username firstName lastName avatar")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName avatar",
            },
        });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.status(200).json({ post });
});

export const getUserPosts = expressAsyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("user", "username firstName lastName avatar")
        .populate({
            path: "comments",
            populate: {
                path: "user",
                select: "username firstName lastName avatar",
            },
        });

    res.status(200).json({ posts });
});

export const createPost = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { content, imageUrl } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Post must contain text" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const post = await Post.create({
        user: user._id,
        content: content || "",
        image: imageUrl,
    });

    res.status(201).json({ post });
});

export const updatePost = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;
    const { content, imageUrl } = req.body;

    if (!content && !imageUrl) {
        return res.status(400).json({ error: "Post must contain either text or image" });
    }

    const user = await User.findOne({ clerkId: userId });

    const post = await Post.findBy({ _id: postId, user: user._id });

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.content = content || post.content;
    post.image = imageUrl || post.image;

    await post.save();

    res.status(200).json({ post });
});

export const likePost = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;

    const user = await User.findOne({ clerkId: userId });
    const post = await Post.findById(postId);

    if (!user || !post) return res.status(404).json({ error: "User or post not found" });

    const isLiked = post.likes.includes(user._id);

    if (isLiked) {
        // unlike
        await Post.findByIdAndUpdate(postId, {
            $pull: { likes: user._id },
        });
    } else {
        // like
        await Post.findByIdAndUpdate(postId, {
            $push: { likes: user._id },
        });

        // create notification if not liking own post
        if (post.user.toString() !== user._id.toString()) {
            await Notification.create({
                from: user._id,
                to: post.user,
                type: "like",
                post: postId,
            });
        }
    }

    res.status(200).json({
        message: isLiked ? "Post unliked successfully" : "Post liked successfully",
    });
});

export const deletePost = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { postId } = req.params;

    const user = await User.findOne({ clerkId: userId });
    const post = await Post.findById(postId);

    if (!user || !post) return res.status(404).json({ error: "User or post not found" });

    if (post.user.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "You can only delete your own posts" });
    }

    // delete all comments on this post
    await Comment.deleteMany({ post: postId });

    // delete the post
    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
});