const ProductService = require("./ProductService");
const Shopify = {};

Shopify.Authentication = require("./ShopifyAuth");
Shopify.Product = new ProductService();

module.exports = Shopify;