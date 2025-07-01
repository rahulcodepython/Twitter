import { clerkClient, getAuth } from "@clerk/express";
import expressAsyncHandler from "express-async-handler";
import { Notification } from "../models/notification.model";
import { User } from "../models/user.model";

export const getProfile = expressAsyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    const user = await User.findOneAndUpdate(
        { clerkId: userId },
        req.body,
        { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
});

export const syncUser = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    const user = await User.findOne({ clerkId: userId });

    if (user) return res.status(200).json({ user: user.toObject(), message: "User already exists" });

    const clerkUser = await clerkClient.users.getUser(userId);

    const newUser = await User.create({
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        name: clerkUser.fullName || clerkUser.firstName,
        avatar: clerkUser.imageUrl,
    });

    return res.status(201).json({ user: newUser.toObject(), message: "User created successfully" });
})

export const getCurrentUser = expressAsyncHandler(async (req, res) => {
    const { userId } = getAuth(req);

    const user = await User.findOne({ clerkId: userId });

    if (!user) return res.status(404).json({ error: "User not found" });

    return res.status(200).json(user);
});

export const followUser = expressAsyncHandler(async (req, res) => {
    const { currentuserId } = getAuth(req);
    const { userId } = req.params;

    if (!currentuserId || !userId) return res.status(400).json({ error: "User IDs are required" });

    if (currentuserId === userId) return res.status(400).json({ error: "You cannot follow yourself" });

    const currentUser = await User.findOne({ clerkId: currentuserId });
    const userToFollow = await User.findById({ userId });

    if (!currentUser || !userToFollow) return res.status(404).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(userToFollow._id);

    if (isFollowing) {
        currentUser.following.pull(userToFollow._id);
        userToFollow.followers.pull(currentUser._id);
    } else {
        currentUser.following.push(userToFollow._id);
        userToFollow.followers.push(currentUser._id);

        const notification = new Notification({
            from: currentUser._id,
            to: userToFollow._id,
            type: "follow",
            message: isFollowing ? `${currentUser.name} unfollowed you` : `${currentUser.name} followed you`,
        });
        await notification.save();
    }

    await currentUser.save();
    await userToFollow.save();

    return res.status(200).json({ message: isFollowing ? "Unfollowed successfully" : "Followed successfully" });
})