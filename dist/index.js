"use strict";

var _graphqlYoga = require("graphql-yoga");

var _db = _interopRequireDefault(require("./db"));

var _index = require("./resolvers/index");

var _prisma = _interopRequireDefault(require("./prisma"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pubsub = new _graphqlYoga.PubSub();
var server = new _graphqlYoga.GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: _index.resolvers,
  context: function context(request) {
    // console.log(request.request.headers)
    return {
      db: _db["default"],
      pubsub: pubsub,
      prisma: _prisma["default"],
      request: request
    };
  },
  fragmentReplacements: _index.fragmentReplacements
});
server.start({
  port: process.env.PORT || 3000
}, function () {
  console.log("GraphQL server started at port 3000");
});