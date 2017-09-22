const Http   = require("sf-core/net/http");
const ShopifyAuth = require("./ShopifyAuth");
const http = new Http();

const ShopifyRequest = function() {
    
    var _method = "GET";
    var _endpoint = null;
    var _params = [];
    
    this.exec = function(onSuccess) {
        http.request(
            {
                headers: {
                    "Authorization": "Basic " + btoa(ShopifyAuth.getAPIKey() + ":" + ShopifyAuth.getPassword())
                },
                method: _method,
                url: this.generateURL(),
                onLoad: function(response) {
                    console.log("onLoad");
                    console.log("response: " + response.body);
                    onSuccess(JSON.parse(response.body.toString()));
                }, 
                onError: function(error) {
                    console.log("ShopifyRequest: "+ error.message);
                }
            }
        );
    };
    
    this.setMethod = function(method) {
        _method = method;
    };
    
    this.setEndpoint = function(endpoint) {
        _endpoint = endpoint;
    };
    
    this.addUriParam = function(param, value) {
        _params.push({paramName: param, value: value});
    };

    this.generateURL = function() {
        var url = this.generateBaseURL();
        url += _endpoint;
        for (var i = 0; i < _params.length; i++) {
            url += (i == 0)? "?" : "&";
            url += _params[i].paramName + "=" + (Array.isArray(_params[i].value)? _params[i].value.join(",") : _params[i].value);
        }
        return url;
    };
    
    this.generateBaseURL = function() {
        return "https://" + ShopifyAuth.getStoreName() + ".myshopify.com/admin/";
    };
    
    this.limit = function(amount) {
        this.addUriParam("limit", amount);
        return this;
    };
        
    this.fields = function(fields) {
        this.addUriParam("fields", fields);
        return this;
    };

    this.collectionID = function(id) {
        this.addUriParam("collection_id", id);
        return this;
    };
    
};

module.exports = ShopifyRequest;