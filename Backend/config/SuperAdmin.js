const bcrypt = require("bcrypt");

const superAdmins = [
  {
    id: 1,
    email: "admin1@copperjems.com",
    password: bcrypt.hashSync("Admin@123", 10),
    role: "superadmin"
  },
  {
    id: 2,
    email: "admin2@copperjems.com",
    password: bcrypt.hashSync("Admin@456", 10),
    role: "superadmin"
  }
];
module.exports=superAdmins