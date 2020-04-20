require('@babel/register')
require("@babel/polyfill/noConflict")
const server = require('../../src/server').default

module.exports= async ()=>{
    global.httpServer = await server.start({port:3000}) //Jest puts each of these methods and objects into the global environment. You don't have to require or import anything to use them.
}