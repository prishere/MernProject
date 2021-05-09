import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import newProductRoutes from "./routes/newProductRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import Razorpay from "razorpay";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import jwt from "jsonwebtoken";
import User from "./model/userModel.js";
dotenv.config();
connectDB();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//  Transporter for node mailer Which will send the mail to a specified position

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/api/confirmation/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.isConfirmed = true;
      await user.save();
    } else {
      throw new Error("User doesnot exists");
    }
  } catch (e) {
    res.send("error");
  }

  return res.redirect("https://onepointstoreapp.herokuapp.com/login");
});

app.get("/api/confirmation/reset/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    console.log(user);
    if (user) {
      user.isReset = true;
      await user.save();
      return res.redirect(
        "https://onepointstoreapp.herokuapp.com/resetPassword"
      );
    } else {
      throw new Error("User doesnot exists");
    }
  } catch (e) {
    res.send("error");
  }
  return res.redirect("https://onepointstoreapp.herokuapp.com/login");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/newproducts", newProductRoutes);

// app.use("/api/config/paypal", (req, res) =>
//   res.send(process.env.PAYPAL_CLIENT_ID)
// );

//  some new implementation

app.post("/api/razorpay", async (req, res) => {
  const { amount, objectId } = req.body;
  const payment_capture = 1;

  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: objectId,
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    // console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

//////
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("The server is getting the get request");
  });
}

app.use(notFound);

// handling errors for the wrong id routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(
    `server is running in ${process.env.NODE_ENV} mode at port ${PORT}`.yellow
      .bold
  );
});
