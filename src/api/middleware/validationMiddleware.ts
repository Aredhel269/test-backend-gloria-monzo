import { Request, Response, NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
}