import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
// prisma.query.users("OPERATION ARG","SELECTION SET")
//ASYNC/AWAIT prisma bindings
const createPostForUser = async (authorId,data)=>{
    const post = await prisma.mutation.createPost({
        data:{
            ...data,
            author:{
                connect:{
                    id:authorId
                }
            }
        }
    },`{id}`)
    const user = await prisma.query.user({
        where:{
            id: authorId
        }
    },`{id name email posts{id title published}}`)

    return user
}
const updatePostForUser = async (postId,data) => {
    const post = await prisma.mutation.updatePost({
        data:{
            ...data
        },
        where:{
            id: postId
        }
    },`{author{id}}`)
    const user = await prisma.query.user({
        where:{
            id: post.author.id
        }
    },`{id name email posts{id title published body}}`)

    return user
}
// createPostForUser('ck8xafy0k002q0775g8p40c0t',{
//     title: "ninjoihfniaa",
//     body:"hahfjeqpa",
//     published: true
// })
// .then(user=>{
//     console.log(JSON.stringify(user,null,2))
// })
updatePostForUser('ck8xcmer4009a07752gg5h8m0',{
    title:"it is updated!!!!",
    body:"fuhewf;ouihbufgbw;ufuwgbfu;h",
    published:false,
}).then(user=>{
    console.log(JSON.stringify(user,null,2))
}).catch(err=>{
    console.log(err)
})
