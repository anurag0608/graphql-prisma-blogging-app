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
       return prisma.query.users(null, info)
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
        
        return prisma.query.posts(null,info)

        // if(!args.query){
        //      return db.posts;
        // }else{
        //      return db.posts.filter((post)=>{
        //          return ( post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) || post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase()) );
        //      });
        // }
    },
    comments(parent, args,{db}, info){
        return db.comments;
    }
    
 }
 export {Query as default}