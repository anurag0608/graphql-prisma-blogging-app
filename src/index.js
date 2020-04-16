import { GraphQLServer,PubSub } from 'graphql-yoga'
import db from './db'
import {resolvers,fragmentReplacements} from './resolvers/index'
import prisma from './prisma'
const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs:  './src/schema.graphql',
    resolvers,
    context(request){
        // console.log(request.request.headers)
        return{
            db,
            pubsub,
            prisma,
            request
        }
        
    },
    fragmentReplacements
});

server.start({port: process.env.PORT || 3000},()=>{
    console.log("GraphQL server started at port 3000");
});