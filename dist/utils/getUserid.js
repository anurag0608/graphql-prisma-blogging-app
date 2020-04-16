"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUserid = function getUserid(request) {
  var authRequire = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var header = request.request ? request.request.headers.authorization : //incase of http req 
  request.connection.context.Authorization; //incase of subscription auth header lives in thi

  if (header) {
    var token = header.replace('Bearer ', '');
    var decoded; //it can work without try catch block also... the error will be thrown to the client

    try {
      decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS512']
      });
    } catch (err) {
      throw new Error("Invalid token");
    } // decoded = {userId: user.id}


    return decoded.userId;
  }

  if (authRequire) {
    throw new Error("Authentication required");
  } //else


  return null;
};

exports["default"] = getUserid;