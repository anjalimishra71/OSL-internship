const mongoose = require("mongoose");
require("dotenv").config();

const Employee = require("../models/Employee");
const employees = [
    {
        name: "anjali mishra",
        email: "anjalimishra@gmail.com",
        department: "Software developer",
        salary: 15000,
        employeeType: "full-time",
        organization: ["OSL"]
    },

    { name: "kajal dubey", email: "kajal@gmail.com", department: "devops engineer", salary: 30000 ,
        employeeType: "full-time",
        organization: ["google"]},

    { name: "jyoti tiwari", email: "jyoti@gmail.com", department: "UI developer", salary: 1000,
        employeeType: "part-time",
        organization: ["OSL", "microsoft"] },

    { name: "ruchi tripathi", email: "ruchi@gmail.com", department: "UX developer", salary: 15000 ,
        employeeType: "full-time",
        organization: ["microsoft"]},

    { name: "aadarsh mishra", email: "aadarsh@gmail.com", department: "HR", salary: 5000 ,
        employeeType: "full-time",
        organization: ["linkedin"]},

    { name: "sunit mishra", email: "sunit@gmail.com", department: "AI engineer", salary: 15000,
        employeeType: "part-time",
        organization: ["OSL","amazon"] },

    { name: "rishi singh", email: "rishi@gmail.com", department: "data srcientist", salary: 8000 ,
        employeeType: "full-time",
        organization: ["amazon"]},

    { name: "rishabh mishra", email: "rishabh@gmail.com", department: "Software developer", salary: 19000 ,
        employeeType: "full-time",
        organization: ["google"]},

    { name: "anand mishra", email: "anand@gmail.com", department: "frontend developer", salary: 15000 ,
        employeeType: "part-time",
        organization: ["microsoft","google"]},

    { name: "patanjali thakur", email: "patanjali@gmail.com", department: "Software developer", salary: 20000 ,
        employeeType: "full-time",
        organization: ["OSL"]},

    { name: "pranjal mishra", email: "pranjalmishra@gmail.com", department: "Software developer", salary: 15000 ,
        employeeType: "part-time",
        organization: ["OSL","microsoft"]},

    { name: "kanha dubey", email: "kanha@gmail.com", department: "devops engineer", salary: 30000 ,
        employeeType: "full-time",
        organization: ["microsoft"]},

    { name: "gungun tiwari", email: "gungun@gmail.com", department: "UI developer", salary: 1000 ,
        employeeType: "full-time",
        organization: ["google"]},

    { name: "bhavya tripathi", email: "bhavya@gmail.com", department: "UX developer", salary: 15000 ,
        employeeType: "part-time",
        organization: ["google","amazon"]},

    { name: "anu mishra", email: "anu@gmail.com", department: "HR", salary: 5000 ,
        employeeType: "full-time",
        organization: ["OSL"]},

    { name: "saurya mishra", email: "saurya@gmail.com", department: "AI engineer", salary: 15000 ,
        employeeType: "part-time",
        organization: ["linkedin","OSL"]},

    { name: "priya singh", email: "priya@gmail.com", department: "data srcientist", salary: 98000 ,
        employeeType: "part-time",
        organization: ["OSL","google"]},

    { name: "bhavna mishra", email: "bhavna@gmail.com", department: "Software developer", salary: 19000 ,
        employeeType: "part-time",
        organization: ["OSL","google"]},

    { name: "surya mishra", email: "surya@gmail.com", department: "frontend developer", salary: 15000 ,
        employeeType: "full-time",
        organization: ["OSL"]},

    { name: "panjali thakur", email: "panjali@gmail.com", department: "Software developer", salary: 29000 ,
        employeeType: "full-time",
        organization: ["linkedin"]},
];
module.exports=employees;


// mongoose.connect(process.env.MONGO_URL).then(async () => {
//  await Employee.deleteMany();
//  await Employee.insertMany(employees);
//  console.log("Employee added successfully");
//  mongoose.connection.close();
// }).catch((error)=>{
//     console.log(error);
// })