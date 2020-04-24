import bcrypt from 'bcryptjs'
import prisma from '../../src/prisma';
const seedDatabase = async ()=>{
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
    await prisma.mutation.createPost({
        data: posts[0]
    })
    await prisma.mutation.createPost({
        data: posts[1]
    })
    //for each loop when tried was causing an error on test 2 for exposing posts and idk why? :-|
} //this is the max timeout of this async

export {seedDatabase as default} 