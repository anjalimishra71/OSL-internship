const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Organization = require("./models/Organizations")
require("dotenv").config();
const Employee = require("./models/Employee")
const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Employee API is running");
});

app.get("/api/employees", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch employees" })
    }
})


app.post("/api/employees", async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to add employee"
        });
    }
});

app.put("/api/employees/:id", async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(employee);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to update employee"
        });
    }
});


app.delete("/api/employees/:id", async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);

        res.json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete employee"
        });
    }
});

app.get("/api/organizations", async (req, res) => {
    try {
       const organizations=await Organization.find();
        res.json(organizations);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to fetch organizations"
        });
    }
});


app.post("/api/organizations", async (req, res) => {
    try {
        const organization = await Organization.create({
            name: req.body.name
        })
        res.status(200).json(organization)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to add organization"
        })
    }
})


app.listen(5000, () => {
    console.log("Server running on port 5000");
});