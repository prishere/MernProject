import mongoose from "mongoose";

const newProductSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      req: true,
      ref: "User",
    },
    mail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    isAdded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NewProduct = mongoose.model("NewProduct", newProductSchema);

export default NewProduct;
