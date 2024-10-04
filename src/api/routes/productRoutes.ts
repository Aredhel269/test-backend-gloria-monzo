import express from "express";
import * as productController from "../controllers/productController";
import { validateProduct } from "../middleware/validationMiddleware";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", validateProduct, productController.createProduct);
router.put("/:id", validateProduct, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
