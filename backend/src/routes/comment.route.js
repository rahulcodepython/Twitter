import express from "express";
import { updateComment } from "../controllers/comment.controller";

const router = express.Router();

router.get("/post/:postId", getComments);

router.post("/post/:postId", protectRoute, createComment);
router.patch("/comment/:commentId", protectRoute, updateComment);
router.delete("/comment/:commentId", protectRoute, deleteComment);

export { router as CommentRouter };
