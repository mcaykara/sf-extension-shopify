const extend = require("js-base/core/extend");
const ShopifyRequest = require("./ShopifyRequest");

const ProductRequest = extend(ShopifyRequest)(
    function(_super, params) {
        _super(this, params);
        
        this.limit = function(amount) {
            this.addUriParam("limit", amount);
            return this;
        };
        
        this.fields = function(fields) {
            this.addUriParam("fields", fields);
            return this;
        };
    }
);

module.exports = ProductRequest;