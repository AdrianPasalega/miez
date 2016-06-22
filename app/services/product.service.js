'use strict';

const Product = require('../models/product.model').schema;

class ProductService() {
  
  constructor() {};
  
  addProduct(data, callback) {
    
    let product = new Product(data);
    
    product.save(function(err, newProduct) {
      if (err) {
        return callback(err);
      }
      callback(null, newProduct);
    })
  }
  
  updateProduct(sku, data, callback) {
    if (!sku) {
      let NoSkuErr = new Error('SKU missing');
      NoSkuErr.type = 'sku_required';
      return callback(NoSkuErr);
    }
    this.findProductBySku(sku, function(err, product){
      if (err) {
         return callback(err);
       }
       if(!product) {
         let NoProductErr = new Error('Product missing');
         NoProductErr.type = 'product_not_found';
         return callback(NoProductErr);
       }
      
      _.assign(product, data);

      product.save(function(err, productUpdated) {
        if (err) {
          return callback(err);
        }
        callback(null, productUpdated);
      })
    })
  }
  
  findProductBySku(sku, callback) {
    if (!sku) {
      let NoSkuErr = new Error('SKU missing');
      NoSkuErr.type = 'sku_required';
      callback(NoSkuErr);
    }
    Product.findBySKU(sku, function(err, product) {
      if (err) {
        return callback(err);
      }
      callback(null, product);
    })
  }
  
  getAllProducts(query, limit, skip, callback) {
    if (typeof query === 'function') {
      callback = query;
      query = {};
      limit = 50;
      skip = 10;
    }
    if (typeof limit === 'function') {
      callback = limit;
      limit = 50;
      skip = 10;
    }
    Product.find({}, function(err, products) {

    })

  }
  
  deleteProducts(sku, callback) {}
  
}

module.exports.ProductService = ProductService;