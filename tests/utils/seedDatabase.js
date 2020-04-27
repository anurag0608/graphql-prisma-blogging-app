import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'
const userOne = {
    input:{
        name:"axdu",
        email:"axdu.something@something.com",
        age:20,
        password: bcrypt.hashSync("asb@#$%^lnjfekl646416")
    },
    user: undefined,
    jwt:undefined
}
const userTwo = {
    input:{
        name:"alpha",
        email:"alpha.something@something.com",
        age:20,
        password: bcrypt.hashSync("asb@#$%^lnjfekl646416")
    },
    user: undefined,
    jwt:undefined
}
const postOne = {
    input:{
        title:"test post 1",
        body:".......",
        published:true
    },
    post: undefined
}
const postTwo = {
    input:{
        title:"test post 2",
        body:".......",
        published:false
    },
    post: undefined
}
const commentOne = {
    input:{
        text:"comment one by user one"
    },
    comment: undefined
}

const commentTwo = {
    input:{
        text:"comment two by user two"
    },
    comment: undefined
}
const seedDatabase = async ()=>{
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userOne.jwt = jwt.sign({userId:userOne.user.id},process.env.JWT_SECRET,{algorithm:'HS512',expiresIn:'2 days'})
    userTwo.jwt = jwt.sign({userId:userTwo.user.id},process.env.JWT_SECRET,{algorithm:'HS512',expiresIn:'2 days'})
   
    //create post 1
    postOne.post =  await prisma.mutation.createPost({
        data: { 
            ...postOne.input ,
            author:{
                connect:{
                    id:userOne.user.id
                }
            }
        }
    })
    //create post2
    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author:{
                connect:{
                    id:userOne.user.id
                }
            }
        }
    })
    //commenting on postOne by userTwo
    commentTwo.comment = await prisma.mutation.createComment({
        data:{
             ...commentTwo.input,
             author:{
                connect:{
                    id: userTwo.user.id
                }
             },
             post:{
                 connect:{
                     id:postOne.post.id
                 }
             }
        }
    })
    //commenting on postOne by userOne
    commentOne.comment = await prisma.mutation.createComment({
        data:{
             ...commentOne.input,
             author:{
                connect:{
                    id: userOne.user.id
                }
             },
             post:{
                 connect:{
                     id:postOne.post.id
                 }
             }
        }
    })
    //for each loop when tried was causing an error on test 2 for exposing posts and idk why? :-|
} //this is the max timeout of this async

export {seedDatabase as default,userOne,userTwo,postOne,postTwo,commentOne,commentTwo} 