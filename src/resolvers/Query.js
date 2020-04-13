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
        //second arg can be null/string/object
        //info comes from client
        // if(!args.query){
        //      return db.users;
        // }else{
        //     //we'll use array.filter which returns new set objects from the given array which statisfy a given condition. In this case its string match
        //     return db.users.filter((user)=>  user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) );
        // }
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

        // if(!args.query){
        //      return db.posts;
        // }else{
        //      return db.posts.filter((post)=>{
        //          return ( post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) );
        //      });
        // }
    },
    comments(parent, args,{ prisma }, info){
        return prisma.query.comments(null,info);
        //since prisma is fetching all the data from the database from info object which is a object, 
        //so there is no need of any other resolver for resolving author associated with comments
    }
    
 }
 export {Query as default}