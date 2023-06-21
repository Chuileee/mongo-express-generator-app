let mongoose=require('mongoose');

//create
let employeeModel =mongoose.Schema(
    {
        "name": String,
        "address": String,
        "contact": Number
    },
    {
        collection:"employee"
    }
);

module.exports = mongoose.model('Employee',employeeModel);