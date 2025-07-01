import express from "express";
import { followUser, getCurrentUser, getProfile, syncUser, updateProfile } from "../controllers/user.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/profile/:username", getProfile);
router.post("/sync", protectedRoute, syncUser);
router.get("/me", protectedRoute, getCurrentUser);
router.patch("/profile", protectedRoute, updateProfile);
router.post("/follow/:userId", protectedRoute, followUser);

export { router as UserRouter };
