const mongoose =require("mongoose");
const employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    department:String,
    salary:Number,
    employeeType:String,
    organization:[String]
})

// const employeeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         lowercase: true,
//         trim: true
//     },

//     department: {
//         type: String,
//         required: true,
//         trim: true
//     },

//     salary: {
//         type: Number,
//         required: true,
//         min: 0
//     },

//     employeeType: {
//         type: String,
//         required: true,
//         enum: ["full-time", "part-time"]
//     },

//     organization: {
//         type: [String],
//         required: true,
//         validate: {
//             validator: function (value) {
//                 return value.length > 0;
//             },
//             message: "At least one organization is required"
//         }
//     }
// });


const Employee=mongoose.model("Employee",employeeSchema);
module.exports=Employee;