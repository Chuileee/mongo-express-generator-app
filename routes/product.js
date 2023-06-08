let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to model
let Product = require('../models/product');

//Manage routes
router.get('/', (req, res, next) => {
    Product.find((err, productList) => {
        if(err){
            return console.error(err);
        }else{
            //console.log(productList);
            res.render('product/list', {title: 'Product Info', ProductList: productList})
        }
    });
});

// to open add product page
router.get('/add', (req, res, next) => {
    res.render('product/add', {title: 'Add Product'})
});

// insert product data into mongoDB collection
router.post('/add', (req,res,next)=>{
    //getting data from form
    let newProduct = Product({
        "name": req.body.pname,
        "company":req.body.pcompany,
        "price":req.body.price
    });

    //insert data into the mongoDB
    Product.create(newProduct,(err, Product) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
        res.redirect('/products')
        }
    });
});


module.exports = router;