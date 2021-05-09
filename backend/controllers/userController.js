import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { email, password } from "../secrets.js";

// transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// @desc  Auth user -get A token
// @routes Post /api/users/login
// @access   public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send({ email, password });
  const user = await User.findOne({ email });

  if (user && !user.isConfirmed) {
    throw new Error(
      " Please confirm Your mail By Clicking on The Link in Your inbox"
    );
  } else if (user && user.isConfirmed && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("wrong email or password");
  }
});

// @desc Create new User
// @routes Post /api/users
// @access   public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // res.send({ email, password });
  const userExists = await User.findOne({ email });
  if (userExists && !userExists.isConfirmed) {
    res.status(400);
    throw new Error(
      "User already registerd Please click on Link on the registerd mail"
    );
  }
  if (userExists && user.isConfirmed) {
    res.status(400); // bad request
    throw new Error("User already exists by the given Email");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    let id = user._id;
    jwt.sign(
      { id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
      (err, emailToken) => {
        const url = `https://onepointstoreapp.herokuapp.com/api/confirmation/${emailToken}`;

        transporter.sendMail({
          to: user.email,
          subject: "Confirm  Your Email",
          html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });
      }
    );

    res.status(201).json({ message: "sent successfully" });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc Auth user for reset Password Link
// @routes post /api/users/forgot
// @access public
const getForgotAccount = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const userExists = await User.findOne({ email });
  if (userExists) {
    let id = userExists._id;
    jwt.sign(
      { id },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
      (err, emailToken) => {
        const url = `https://onepointstoreapp.herokuapp.com/api/confirmation/reset/${emailToken}`;

        transporter.sendMail({
          to: userExists.email,
          subject: "Click On The Link  For Reset Password",
          html: `Please click this email to confirm its You for reset Password: <a href="${url}">${url}</a>`,
        });
      }
    );

    res.status(201);
    res.json({
      _id: id,
      token: generateToken(id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Exist By Given Email");
  }
});

// @desc Auth user for reset Password Link
// @routes put /api/users/reset
// @access protected

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userExists = await User.findById(decoded.id);
  if (userExists && userExists.isReset) {
    userExists.password = password;
    userExists.isReset = false;
    await userExists.save();
    res.status(201).json({ message: "successfully reset password" });
  } else {
    res.status(404);
    throw new Error("Bad Request! Authentication Failed!");
  }
});

// @desc  Auth user getUser profile
// @routes get /api/users/profile
// @access  private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc  Update user profile
// @routes put /api/users/profile
// @access  private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc get all users
// @routes get /api/users
// @access  private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc delete a  users
// @routes get /api/users/:id
// @access  private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "user successfully removed!" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc get user by id
// @routes get /api/users/:id
// @access  private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc  Update user By id
// @routes PUT /api/users/:id
// @access  private/admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getForgotAccount,
  resetPassword,
};
