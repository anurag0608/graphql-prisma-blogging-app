import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
    async createUser(parent, args, {prisma}, info){
       if(args.data.password.length < 8){
           throw new Error("Password length must be 8 chars or greater!")
       }
        const hash = await bcrypt.hash(args.data.password,12)

        const user = await prisma.mutation.createUser({
           
            data: {
                ...args.data,
                password: hash
            }
        
        })
        // console.log(user)
        //if we write that we want both user and token then it'll fail because createUser cannot return token obj
        return {
            user,
            token: jwt.sign({userId: user.id},"willbeasecretkey",{algorithm:'HS512',expiresIn:'1h'})
        }
      
    },
    async deleteUser(parent, args, {prisma}, info){
        
        return prisma.mutation.deleteUser({
            where:{
                id:args.id
            }
        },info)    
    },
    async updateUser(parent, args, {prisma}, info){
           
            return prisma.mutation.updateUser({
                where:{
                    id: args.id
                },
                data: args.data
            },info)
           
    },
     createPost(parent, args, {prisma,pubsub}, info){
       
       return prisma.mutation.createPost({
           data:{
               title: args.data.title,
               body: args.data.body,
               published: args.data.published,
               author:{
                   connect:{
                       id:args.data.author
                   }
               }
           }
       },info)
    },
    deletePost(parent, args, {prisma,pubsub}, info){
        
        return prisma.mutation.deletePost({
            where:{
                id:args.id
            }
        },info)
    },
    updatePost(parent, args, {prisma,pubsub},info){
        
        return prisma.mutation.updatePost({
            where:{
                id:args.id
            },
            data: args.data
        },info)
    },
    createComment(parent, args, {prisma,pubsub}, info){
        return prisma.mutation.createComment({ 
                data:{
                        text: args.data.text,
                        author:{
                            connect:{
                                id:args.data.author
                            }
                        },
                        post:{
                            connect:{
                                id:args.data.post
                            }
                        }
                    }
             },info)
        
    },
    updateComment(parent, args, {prisma,pubsub},info){
        return prisma.mutation.updateComment({
            data: args.data,
            where:{
                id:args.id
            }
        },info)
    },
    deleteComment(parent, args, {prisma,pubsub}, info){
        return prisma.mutation.deleteComment({
            where:{
                id:args.id
            }
        },info)
    }
}

export { Mutation as default }