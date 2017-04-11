const extend = require("js-base/core/extend");
const ShopifyService = require("./ShopifyService");
const ProductRequest = require("./ProductRequest");

const ProductService = extend(ShopifyService)(
    function(_super, params) {
        _super(this, params);

        this.getAllProducts = function() {
            var request = new ProductRequest();
            request.setEndpoint("products.json");
            return request;
        };

        this.getProduct = function(productID) {
            var request = new ProductRequest();
            request.setEndpoint("products/" + productID + ".json");
            return request;
        };
    }
);

module.exports = ProductService;