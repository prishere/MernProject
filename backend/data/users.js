import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
    isConfirmed: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    isConfirmed: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Piyush Raj",
    email: "malhotrapiyush780@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isConfirmed: true,
  },
];

export default users;
