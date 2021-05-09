import express from "express";
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// @desc  fetch all products
// @routes  /api/products/
// @access   public routes

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/top", getTopProducts);

// @desc  fetch single products
// @routes  /api/products/:id
// @access   public

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
