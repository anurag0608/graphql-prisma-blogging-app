import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
// prisma.query.users("OPERATION ARG","SELECTION SET")
// prisma.query.users(null,'{id name posts{id title}}').then((data)=>{
//     console.log(JSON.stringify(data,null,3))
// })
// prisma.query.comments(null,`{id text author{id name}}`).then((data)=>{
//     console.log(JSON.stringify(data,null,3))
// })
prisma.mutation.createPost({
    data:{
        title: "My new graphql post is live!",
        body: "this is body",
        published: true,
        author:{
            connect:{
                id:"ck8xafy0k002q0775g8p40c0t"
            }
        }
    }
},'{id title body published}').then((data)=>{
    console.log(JSON.stringify(data,null,3))
    return prisma.query.users(null,`{id name posts{id title}}`)
}).then(data=>{
    console.log(JSON.stringify(data,null,3))
})