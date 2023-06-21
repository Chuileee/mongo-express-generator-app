let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Employee = require('../models/employee');

//Manage routes
router.get('/', (req, res, next) => {
    Employee.find((err, employeeList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(productList);
            res.render('employee/list', {title: 'Employee Info', EmployeeList: employeeList})
        }
    });
});

// to open add employee page
router.get('/add', (req, res, next) => {
    res.render('employee/add', {title: 'Add Employee'})
});

// insert employee data into mongoDB collection
router.post('/add', (req,res,next)=>{
    //getting data from form
    let newEmployee = Employee({
        "name": req.body.ename,
        "address":req.body.eaddress,
        "contact":req.body.econtact
    });

    //insert data into the mongoDB
    Employee.create(newEmployee,(err, Employee) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
        res.redirect('/employees')
        }
    });
});

//Retrieve data from MongoDB and Open it in view (Form)
router.get('/edit/:id',(req,res,next)=>{
    let id = req.params.id;

    Employee.findById(id, (err, employeeToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //write to display data in view
            res.render('employee/edit', {title : 'Edit Employee', employee: employeeToEdit})
        
        }
    });
}) ;

//this mean localhost:3000/product/edit/id

//write code to store updated date into mongodb
router.post('/edit/:id', (req,res,next) => {
    let id = req.params.id;

    let updatedEmployee = Employee({
        "_id": id,
        "name": req.body.ename,
        "address": req.body.eaddress,
        "contact": req.body.econtact
    });



    Employee.updateOne({_id: id}, updatedEmployee, (err)=>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            console.log('Exit from edit page');
            res.redirect('/employees');
        
        }
    });
});

//to delete document from the collection
router.get('/delete/:id', (req,res,next)=>{
    let id = req.params.id;

    Employee.remove({_id:id}, (err)=>{
        if(err){
            console.log(err)
            res.end(err);
        }else{
            res.redirect('/employees');
        
        }
    })
});




module.exports = router;