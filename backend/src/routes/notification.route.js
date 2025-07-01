import express from "express";
import { deleteNotification, getNotifications } from "../controllers/notification.controller";
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protectedRoute, getNotifications);
router.delete("/notification/:notificationId", protectedRoute, deleteNotification);

export { router as NotificationRouter };
