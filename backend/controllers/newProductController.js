import asyncHandler from "express-async-handler";
import NewProduct from "../model/newProductModel.js";
import Product from "../model/productModel.js";

// @desc  fetch all newproducts
// @routes GET /api/newproducts
// @access  private
const getNewProducts = asyncHandler(async (req, res) => {
  const newProducts = await NewProduct.find({});
  res.json(newProducts);
});

// @desc  fetch newproducts By Id
// @routes GET /api/newproducts/:id
// @access  private
const getNewProductsById = asyncHandler(async (req, res) => {
  const newProduct = await NewProduct.findById(req.params.id);

  if (newProduct) {
    res.send(newProduct);
  } else {
    res.status(404);
    throw new Error(`Product not Found`);
  }
});

// @desc  fetch all newproducts added by specific user
// @routes GET /api/newproducts/details
// @access  private
const getProductsByUserId = asyncHandler(async (req, res) => {
  const allProducts = await NewProduct.find({ user: req.user.id });
  res.json(allProducts);
});

// @desc    Create a newproduct
// @route   POST /api/newproducts
// @access  Private
const createNewProduct = asyncHandler(async (req, res) => {
  const newProduct = new NewProduct({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    mail: req.user.email,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdNewProduct = await newProduct.save();
  res.status(201).json(createdNewProduct);
});

// @desc    Update a newProduct
// @route   PUT /api/newproducts/:id
// @access  Private
const updateNewProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const newProduct = await NewProduct.findById(req.params.id);

  if (newProduct) {
    newProduct.name = name;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.image = image;
    newProduct.brand = brand;
    newProduct.category = category;
    newProduct.countInStock = countInStock;
    newProduct.mail = req.user.email;

    const updatedNewProduct = await newProduct.save();
    res.json(updatedNewProduct);
  } else {
    res.status(404);
    throw new Error("The given Product not found");
  }
});

// @desc    Delete a newproduct
// @route   DELETE /api/newproducts/:id
// @access  Private
const deleteNewProduct = asyncHandler(async (req, res) => {
  const newProduct = await NewProduct.findById(req.params.id);

  if (newProduct) {
    await newProduct.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc add a product to the orignal database
//@route  post /api/newproducts/:id
// @access Private admin
const addNewProductForSale = asyncHandler(async (req, res) => {
  const newProduct = await NewProduct.findById(req.params.id);
  if (newProduct) {
    const product = new Product({
      _id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      user: req.user._id,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      numReviews: 0,
      description: req.body.description,
    });
    const createdProduct = await product.save();
    // Set new Product to orignal database...
    newProduct.isAdded = true;
    await newProduct.save();
    res.status(201).json(createdProduct);
  } else {
    res.status("404");
    throw new Error("Product not present in database");
  }
});

export {
  createNewProduct,
  updateNewProduct,
  getNewProducts,
  getProductsByUserId,
  getNewProductsById,
  deleteNewProduct,
  addNewProductForSale,
};
