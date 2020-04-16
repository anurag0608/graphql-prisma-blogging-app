"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserid = _interopRequireDefault(require("../utils/getUserid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Subscription = {
  comment: {
    subscribe: function subscribe(parent, args, _ref, info) {
      var prisma = _ref.prisma;
      var postId = args.postId;
      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref2, info) {
      var prisma = _ref2.prisma;
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info);
    }
  },
  myPost: {
    subscribe: function subscribe(parent, args, _ref3, info) {
      var prisma = _ref3.prisma,
          request = _ref3.request;
      var userId = (0, _getUserid["default"])(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  }
};
exports["default"] = Subscription;