import express from 'express';
import { createPost, deletePost, getPost, getPosts, getUserPosts, likePost, updatePost } from '../controllers/post.controller';
import { protectedRoute } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getPosts);
router.get("/post/:postId", getPost);
router.get("/user/:username", getUserPosts);

router.post("/", protectedRoute, createPost);
router.patch("/post/:postId", protectedRoute, updatePost);
router.post("/post/:postId/like", protectedRoute, likePost);
router.delete("/post/:postId", protectedRoute, deletePost);


export { router as PostRouter };
