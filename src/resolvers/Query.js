import getUserid from '../utils/getUserid'
const Query = {
    me(parent, args, {prisma, request},info){
        const userId = getUserid(request)
        return prisma.query.user({
            where:{
                id:userId
            }
        },info)
    },
   async myPosts(parent,args,{prisma,request},info){
        const userId = getUserid(request)
        const opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy,
            where:{
                author:{
                    id:userId
                }
            }
        }
        if(args.query){
            opArgs.where.OR = [
            {
                title_contains:args.query
            },
            {
                body_contains:args.query
            }]
        }
        return prisma.query.posts(opArgs,info)
   },
   async post(parent, args, { prisma, request }, info){
        const userId = getUserid(request,false)
        //getUserid is returning null when authRequire is false
        // if no defined userId will be undefined and while defining condition
        /**
         * where:{
         *  id:args.id,
         *  OR:[{published=true},{author:{ id: userId}}]
         * }
         * 
         * so when userId is set to undefined --> the second field of array will always return true because it can be
         * matched with any value as it's value is undefined
         */
        //Also in 'post' query prisma provides only id field in where clause, so we'll use posts for ease 
        const posts = await prisma.query.posts({
            where:{
                id:args.id,
                OR:[
                    {
                        published:true
                    },
                    {
                        author:{
                            id:userId
                        }
                    }
                ]
            }
        },info)
        if(posts.length===0){
            throw new Error("Post not found!")
        }
        // console.log(posts)
        return posts[0]
    },
    users(parent, args, { prisma }, info){
        let opArgs = {
            first: args.first,
            skip: args.skip,
            after:args.after,
            orderBy:args.orderBy
        }
        if(args.query){
            opArgs.where = {
                OR:[{
                    name_contains:args.query
                }]
            }
        }
       return prisma.query.users(opArgs, info)
       //parent will return all the fields provided in the info
    },
    posts(parent, args, { prisma }, info){
        let opArgs = {
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy,
            where:{
                published:true
            }
        }
        if(args.query){
            opArgs.where.OR = [
                {
                    title_contains:args.query
                },
                {
                    body_contains:args.query
                }
            ]
            
        }
        return prisma.query.posts(opArgs,info)
    },
    comments(parent, args,{ prisma }, info){
        const opArgs={
            first:args.first,
            skip:args.skip,
            after:args.after,
            orderBy:args.orderBy
        }
        return prisma.query.comments(opArgs,info);
        //since prisma is fetching all the data from the database from info object which is a object, 
        //so there is no need of any other resolver for resolving author associated with comments
    }
    
 }
 export {Query as default}