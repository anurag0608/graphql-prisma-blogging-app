"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _Query = _interopRequireDefault(require("./Query"));

var _Mutation = _interopRequireDefault(require("./Mutation"));

var _Subscription = _interopRequireDefault(require("./Subscription"));

var _User = _interopRequireDefault(require("./User"));

var _Post = _interopRequireDefault(require("./Post"));

var _Comment = _interopRequireDefault(require("./Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resolvers = {
  Query: _Query["default"],
  Subscription: _Subscription["default"],
  Mutation: _Mutation["default"],
  User: _User["default"],
  Post: _Post["default"],
  Comment: _Comment["default"]
};
exports.resolvers = resolvers;