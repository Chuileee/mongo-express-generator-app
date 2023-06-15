let mongoose=require('mongoose');

//create
let orderModel =mongoose.Schema(
    {
        "address": String
    },
    {
        collection:"orders"
    }
);

module.exports = mongoose.model('Product',productModel);