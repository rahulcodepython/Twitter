import express from 'express';
import { getPost, getPosts, getUserPosts, updatePost } from '../controllers/post.controller';

const router = express.Router();

router.get('/', getPosts);
router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

router.post("/", protectRoute, createPost);
router.patch("/", protectRoute, updatePost);
router.post("/:postId/like", protectRoute, likePost);
router.delete("/:postId", protectRoute, deletePost);


export { router as PostRouter };
