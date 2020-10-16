const bcrypt = require("bcryptjs");

const users = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("admin", 10),
    isAdmin: true
  },
  { username: "amine", email: "amine@gmail.com", password: bcrypt.hashSync("amine", 10) },
  { username: "ali", email: "ali@gmail.com", password: bcrypt.hashSync("ali", 10) }
];
module.exports = users;
