import express from 'express';
import { getPost, getPosts, getUserPosts, updatePost } from '../controllers/post.controller';

const router = express.Router();

router.get('/', getPosts);
router.get("/post/:postId", getPost);
router.get("/user/:username", getUserPosts);

router.post("/", protectRoute, createPost);
router.patch("/post/:postId", protectRoute, updatePost);
router.post("/post/:postId/like", protectRoute, likePost);
router.delete("/post/:postId", protectRoute, deletePost);


export { router as PostRouter };
