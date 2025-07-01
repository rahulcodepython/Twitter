import express from 'express';
import { PostRouter } from './post.route';
import { UserRouter } from './user.route';

const router = express.Router();

router.use('/users', UserRouter);
router.use('/posts', PostRouter)

export { router };
