"use strict";

var express = require("express");

var cors = require("cors");

require("./db/config");

var User = require('./db/User');

var Product = require("./db/Product");

var Jwt = require('jsonwebtoken');

var jwtKey = 'e-com';
var app = express();
app.use(express.json());
app.use(cors());
app.post("/register", function _callee(req, resp) {
  var user, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = new User(req.body);
          _context.next = 3;
          return regeneratorRuntime.awrap(user.save());

        case 3:
          result = _context.sent;
          result = result.toObject();
          delete result.password;
          Jwt.sign({
            result: result
          }, jwtKey, {
            expiresIn: "2h"
          }, function (err, token) {
            if (err) {
              resp.send("Something went wrong");
            }

            resp.send({
              result: result,
              auth: token
            });
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/login", function _callee2(req, resp) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (!(req.body.password && req.body.email)) {
            _context2.next = 7;
            break;
          }

          _context2.next = 3;
          return regeneratorRuntime.awrap(User.findOne(req.body).select("-password"));

        case 3:
          user = _context2.sent;

          if (user) {
            Jwt.sign({
              user: user
            }, jwtKey, {
              expiresIn: "2h"
            }, function (err, token) {
              if (err) {
                resp.send("Something went wrong");
              }

              resp.send({
                user: user,
                auth: token
              });
            });
          } else {
            resp.send({
              result: "No User found"
            });
          }

          _context2.next = 8;
          break;

        case 7:
          resp.send({
            result: "No User found"
          });

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post("/add-product", function _callee3(req, resp) {
  var product, result;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          product = new Product(req.body);
          _context3.next = 3;
          return regeneratorRuntime.awrap(product.save());

        case 3:
          result = _context3.sent;
          resp.send(result);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.get("/products", function _callee4(req, resp) {
  var products;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Product.find());

        case 2:
          products = _context4.sent;

          if (products.length > 0) {
            resp.send(products);
          } else {
            resp.send({
              result: "No Product found"
            });
          }

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app["delete"]("/product/:id", function _callee5(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Product.deleteOne({
            _id: req.params.id
          }));

        case 2:
          result = _context5.sent;
          resp.send(result);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}), app.get("/product/:id", function _callee6(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }));

        case 2:
          result = _context6.sent;

          if (result) {
            resp.send(result);
          } else {
            resp.send({
              "result": "No Record Found."
            });
          }

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.put("/product/:id", function _callee7(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: req.params.id
          }, {
            $set: req.body
          }));

        case 2:
          result = _context7.sent;
          resp.send(result);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.put("/product/:id", function _callee8(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(Product.updateOne({
            _id: req.params.id
          }, {
            $set: req.body
          }));

        case 2:
          result = _context8.sent;
          resp.send(result);

        case 4:
        case "end":
          return _context8.stop();
      }
    }
  });
});
app.get("/search/:key", function _callee9(req, resp) {
  var result;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(Product.find({
            "$or": [{
              name: {
                $regex: req.params.key
              }
            }, {
              company: {
                $regex: req.params.key
              }
            }, {
              category: {
                $regex: req.params.key
              }
            }]
          }));

        case 2:
          result = _context9.sent;
          resp.send(result);

        case 4:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.listen(5000);