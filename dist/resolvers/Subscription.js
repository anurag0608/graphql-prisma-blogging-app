"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
  }
};
exports["default"] = Subscription;