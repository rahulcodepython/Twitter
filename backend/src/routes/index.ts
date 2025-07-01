import express from 'express';
import { CommentRouter } from './comment.route';
import { NotificationRouter } from './notification.route';
import { PostRouter } from './post.route';
import { UserRouter } from './user.route';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Twitter Clone API',
    });
});
router.use('/users', UserRouter);
router.use('/posts', PostRouter);
router.use('/comments', CommentRouter);
router.use('/notifications', NotificationRouter);

export { router };
