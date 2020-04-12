import {Prisma} from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists
// prisma.query.users("OPERATION ARG","SELECTION SET")
//ASYNC/AWAIT prisma bindings
const createPostForUser = async (authorId,data)=>{
    const userExists = await prisma.exists.User({
        id:authorId
    })
    if(!userExists) throw new Error("NO such user exist")
    const post = await prisma.mutation.createPost({
        data:{
            ...data,
            author:{
                connect:{
                    id:authorId
                }
            }
        }
    },`{author{id name email posts{id title published}}}`)
    
    return post.author
}
const updatePostForUser = async (postId,data) => {
    const postExists = await prisma.exists.Post({
        id:postId
    })
    if(!postExists) throw new Error("No such post exists")
    const post = await prisma.mutation.updatePost({
        data:{
            ...data
        },
        where:{
            id: postId
        }
    },`{author{id name email posts{id title published}}}`)
    return post.author
}
// createPostForUser('ck8xafy0k002q0775g8p40c0t',{
//     title: "this is new",
//     body:"hahfjeqpa",
//     published: true
// })
// .then(user=>{
//     console.log(JSON.stringify(user,null,2))
// })
// .catch(err=>{
//     console.log(err.message)
// })
// updatePostForUser('ck8xcmer4009a07752gg5h8m0',{
//     title:"it is updated and refactored!!!!",
//     body:"hey there!!",
//     published:true,
// }).then(user=>{
//     console.log(JSON.stringify(user,null,2))
// }).catch(err=>{
//     console.log(err.message)
// })

//checking availiblity of object in the database
// prisma.exists.Comment({
//         id:"ck8j8sert00550799pfuj9okl",
//         author:{
//             id:'ck8j8l415000x0799oydxo67a'
//         }
// }).then(exists=>{
//     console.log(exists)
// })
