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
const seedDatabase = async ()=>{
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({userId:userOne.user.id},process.env.JWT_SECRET,{algorithm:'HS512',expiresIn:'2 days'})
   
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
    //for each loop when tried was causing an error on test 2 for exposing posts and idk why? :-|
} //this is the max timeout of this async

export {seedDatabase as default,userOne,postOne,postTwo} 