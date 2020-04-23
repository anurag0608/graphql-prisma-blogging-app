import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import ApolloBoost,{ gql } from 'apollo-boost'
import prisma from '../src/prisma'
import bcrypt from 'bcryptjs'
const client = new ApolloBoost({
    uri:"http://localhost:3000"
})
beforeEach(async ()=>{
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()
    const user = await prisma.mutation.createUser({
        data:{
            name:"axdu",
            email:"axdu.something@something.com",
            age:20,
            password: bcrypt.hashSync("asb@#$%^lnjfekl646416")
        }
    },`{id}`)
    const posts = [{
        title:"test post 1",
        body:".......",
        published:true,
        author:{
            connect:{
                id:user.id
            }
        }
    },{
        title:"test post 2",
        body:".......",
        published:false,
        author:{
            connect:{
                id:user.id
            }
        }
    }]
    posts.forEach(async (post)=>{

        await prisma.mutation.createPost({
            data: post
        })
    
    })


},15000) //this is the max timeout of this async
test("Should create a new user",async ()=>{
    const createUser = gql`
        mutation{
            createUser(
                data:{
                    name:"xyz3",
                    email:"xyz3@xyz.com",
                    password:"123456789"
                }
            ){
                token,
                user{
                    id
                    name
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    })
},10000)