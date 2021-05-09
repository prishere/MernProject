import express from "express";
import {
  createNewProduct,
  getNewProducts,
  updateNewProduct,
  getProductsByUserId,
  getNewProductsById,
  deleteNewProduct,
  addNewProductForSale,
} from "../controllers/newProductController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// create a new product
router
  .route("/")
  .get(protect, admin, getNewProducts)
  .post(protect, createNewProduct);

router.route("/details").get(protect, getProductsByUserId);

router
  .route("/:id")
  .get(protect, getNewProductsById)
  .put(protect, updateNewProduct)
  .delete(protect, deleteNewProduct)
  .post(protect, admin, addNewProductForSale);

export default router;
