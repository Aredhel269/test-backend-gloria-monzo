"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const validateProduct = (req, res, next) => {
    const { name, category, price, quantity } = req.body;
    if (!name || !category || !price || !quantity) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};
exports.validateProduct = validateProduct;
