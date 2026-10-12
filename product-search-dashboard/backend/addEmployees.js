const mongoose = require("mongoose");
require("dotenv").config();

const Employee = require("./models/Employee");
const employees = require("./data/employees");

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        await Employee.insertMany(employees);

        console.log("Employees added successfully");

        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error);
    });