"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserid = _interopRequireDefault(require("../utils/getUserid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = {
  email: {
    fragment: 'fragment Userid on User{ id }',
    resolve: function resolve(parent, args, _ref, info) {
      var prisma = _ref.prisma,
          request = _ref.request;
      var userId = (0, _getUserid["default"])(request, false); //if parent id is equal to authenticated user's id (which is being tried to fetch from db) then we can return reqired email id 
      //else return null
      //so if i logged in as X then I can fetch my email id but if i'll try to fetch Y's email id it'll return null

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: 'fragment Userid on User{id}',
    resolve: function resolve(parent, args, _ref2, info) {
      var prisma = _ref2.prisma;
      return prisma.query.posts({
        where: {
          published: true,
          author: {
            id: parent.id
          }
        }
      });
    }
  }
};
exports["default"] = User;