import express from "express";
import { createComment, deleteComment, getComments, updateComment } from "../controllers/comment.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/post/:postId", getComments);

router.post("/post/:postId", protectedRoute, createComment);
router.patch("/comment/:commentId", protectedRoute, updateComment);
router.delete("/comment/:commentId", protectedRoute, deleteComment);

export { router as CommentRouter };
