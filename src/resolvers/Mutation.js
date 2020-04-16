import bcrypt from 'bcryptjs'
import hashPassword from '../utils/hashPassword'
import getUserid from '../utils/getUserid'
import generateToken from '../utils/generateToken'
const Mutation = {
    async createUser(parent, args, {prisma}, info){
       
        const hash = await hashPassword(args.data.password.trim()) //hashPassword(...) returns promise.. so we'll wait till that promise is resolved

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
            token: generateToken(user.id)
        }
      
    },
    async LogIn(parent, args, {prisma},info){
        const user = await prisma.query.user({
            where:{
                email: args.data.email
            }
        })
        if(!user){
            throw new Error("Unable to login! Invalid email")
        }
        
        const isMatch = await bcrypt.compare(args.data.password,user.password)
        if(!isMatch){
            throw new Error("Wrong password!")
        }
        return{
            user,
            token:generateToken(user.id)
        }
    },
    async deleteUser(parent, args, {prisma,request}, info){
        const userId = getUserid(request)
        return prisma.mutation.deleteUser({
            where:{
                id:userId
            }
        },info)    
    },
    async updateUser(parent, args, {prisma,request}, info){
           const userId = getUserid(request)
        
           if(typeof args.data.password.trim() === 'string'){
            
            args.data.password = await hashPassword(args.data.password.trim())

           }
           
           return prisma.mutation.updateUser({
                where:{
                    id: userId
                },
                data: args.data
            },info)
           
    },
     createPost(parent, args, {prisma,request}, info){
       const userId = getUserid(request)
       return prisma.mutation.createPost({
           data:{
               title: args.data.title,
               body: args.data.body,
               published: args.data.published,
               author:{
                   connect:{
                       id:userId
                   }
               }
           }
       },info)
    },
    async deletePost(parent, args, {prisma,request}, info){
        const userId = getUserid(request)
        //check post owernship
        const postExists = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!postExists){
            throw new Error("Failed to delete post")
        }
        return prisma.mutation.deletePost({
            where:{
                id:args.id
            }
        },info)
    },
    async updatePost(parent, args, {prisma,request},info){
        const userId = getUserid(request)
       
        //check post owernship
        const postExists = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!postExists){
            throw new Error("Failed to update the post!")
        }
        const isPublished = await prisma.exists.Post({
            id:args.id,
            author:{
                id:userId
            },
            published: true
        })
        if(isPublished && !args.data.published){
            //if prev published and about to unpublished delete all associated comments
            await prisma.mutation.deleteManyComments({
                where:{
                    post:{
                        id:args.id
                    }
                }
            })
        }
        return prisma.mutation.updatePost({
            where:{
                id:args.id
            },
            data: args.data
        },info)
    },
    async createComment(parent, args, {prisma,request}, info){
        const userId = getUserid(request)
        const postExists = await prisma.exists.Post({
            id:args.data.post,
            published: true
        })
        if(!postExists){
            throw new Error("No such post exists!")
        }
        return prisma.mutation.createComment({ 
                data:{
                        text: args.data.text,
                        author:{
                            connect:{
                                id:userId
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
    async updateComment(parent, args, {prisma,request},info){
        const userId = getUserid(request)
        //check ownership
        const commentExists = await prisma.exists.Comment({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!commentExists){
            throw new Error("Failed to update the comment!")
        }
        return prisma.mutation.updateComment({
            data: args.data,
            where:{
                id:args.id
            }
        },info)
    },
    async deleteComment(parent, args, {prisma,request}, info){
        
        const userId = getUserid(request)
        //check ownership
        const commentExists = await prisma.exists.Comment({
            id:args.id,
            author:{
                id:userId
            }
        })
        if(!commentExists){
            throw new Error("Failed to delete the comment!")
        }
        return prisma.mutation.deleteComment({
            where:{
                id:args.id
            }
        },info)
    }
}

export { Mutation as default }