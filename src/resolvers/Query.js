const Query = {
    me(){
        return {
             id:'1',
             name:"Anurag",
             email:'anuragv.1020@gmail.com',
             age:20
        }
    },
    post(){
        return {
            id: '40',
            title:'F.R.I.E.N.D.S',
            body:"GraphQL is amazing!",
            published:true
        }
    },
    users(parent, args, { prisma }, info){
        let opArgs = {}
        if(args.query){
            opArgs.where = {
                OR:[{
                    name_contains:args.query
                },{
                    email_contains: args.query
                }]
            }
        }
       return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { prisma }, info){
        let opArgs = {}
        if(args.query){
            opArgs.where = {
                OR:[{
                    title_contains:args.query
                },{
                    body_contains:args.query
                }]
            }
        }
        return prisma.query.posts(opArgs,info)
    },
    comments(parent, args,{ prisma }, info){
        return prisma.query.comments(null,info);
        //since prisma is fetching all the data from the database from info object which is a object, 
        //so there is no need of any other resolver for resolving author associated with comments
    }
    
 }
 export {Query as default}