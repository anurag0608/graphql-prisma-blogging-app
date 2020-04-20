import '@babel/polyfill/noConflict'
import server from './server'

server.start({port: process.env.PORT || 3000},()=>{
    console.log("GraphQL server started at port 3000");
});