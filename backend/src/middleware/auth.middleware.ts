import type { NextFunction } from "express";

export const protectedRoute = (req: any, res: any, next: NextFunction) => {
    if (!req.auth().isAuthenticated) {
        return res.status(401).json({ message: "Unauthorized - you must be logged in" });
    }
    next();
};