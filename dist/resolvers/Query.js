"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getUserid = _interopRequireDefault(require("../utils/getUserid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Query = {
  me: function me(parent, args, _ref, info) {
    var prisma = _ref.prisma,
        request = _ref.request;
    var userId = (0, _getUserid["default"])(request);
    return prisma.query.user({
      where: {
        id: userId
      }
    }, info);
  },
  myPosts: function myPosts(parent, args, _ref2, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var prisma, request, userId, opArgs;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              prisma = _ref2.prisma, request = _ref2.request;
              userId = (0, _getUserid["default"])(request);
              opArgs = {
                first: args.first,
                skip: args.skip,
                after: args.after,
                orderBy: args.orderBy,
                where: {
                  author: {
                    id: userId
                  }
                }
              };

              if (args.query) {
                opArgs.where.OR = [{
                  title_contains: args.query
                }, {
                  body_contains: args.query
                }];
              }

              return _context.abrupt("return", prisma.query.posts(opArgs, info));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  post: function post(parent, args, _ref3, info) {
    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var prisma, request, userId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              prisma = _ref3.prisma, request = _ref3.request;
              userId = (0, _getUserid["default"])(request, false); //getUserid is returning null when authRequire is false
              // if no defined userId will be undefined and while defining condition

              /**
               * where:{
               *  id:args.id,
               *  OR:[{published=true},{author:{ id: userId}}]
               * }
               * 
               * so when userId is set to undefined --> the second field of array will always return true because it can be
               * matched with any value as it's value is undefined
               */
              //Also in 'post' query prisma provides only id field in where clause, so we'll use posts for ease 

              _context2.next = 4;
              return prisma.query.posts({
                where: {
                  id: args.id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 4:
              posts = _context2.sent;

              if (!(posts.length === 0)) {
                _context2.next = 7;
                break;
              }

              throw new Error("Post not found!");

            case 7:
              return _context2.abrupt("return", posts[0]);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  users: function users(parent, args, _ref4, info) {
    var prisma = _ref4.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      };
    }

    return prisma.query.users(opArgs, info); //parent will return all the fields provided in the info
  },
  posts: function posts(parent, args, _ref5, info) {
    var prisma = _ref5.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true
      }
    };

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  comments: function comments(parent, args, _ref6, info) {
    var prisma = _ref6.prisma;
    var opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    };
    return prisma.query.comments(opArgs, info); //since prisma is fetching all the data from the database from info object which is a object, 
    //so there is no need of any other resolver for resolving author associated with comments
  }
};
exports["default"] = Query;