import express from "express";
import { deleteNotification, getNotifications } from "../controllers/notification.controller";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/notification/:notificationId", protectRoute, deleteNotification);

export { router as NotificationRouter };
