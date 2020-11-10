const mongoose =require('mongoose');

const employeeSchema =mongoose.Schema({

    id: { type : String },
    employeeid: { type : String, required: true, unique:true} ,
    employeename: { type : String, required: true},
    department :{ type : String, required: true},
    performanceReview: [],
});


module.exports=mongoose.model('Employee', employeeSchema);