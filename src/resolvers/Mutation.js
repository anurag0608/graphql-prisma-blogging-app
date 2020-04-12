import { v4 as uuidv4 } from 'uuid';

const Mutation = {
    createUser(parent, args, {db}, info){
        const emailTaken = db.users.some((user)=>{
            return user.email === args.data.email;
        });
        if(emailTaken){
            throw new Error("Email taken");
        }
        const user = {
            id: uuidv4(),
            ...args.data
        }
        db.users.push(user);
        return user;
    },
    deleteUser(parent, args, {db}, info){
        //will return first element which statisfy the condition
        //since fo each user id is unique ... so there will be no problem at all in implementation
        const findIndex = db.users.findIndex(user=> user.id === args.id);
        if(findIndex === -1){
            throw new Error("User not found!");
        }
        //before deleting the user, remove its associated comments and posts
        const deletedUser = db.users.splice(findIndex,1);
        
        db.posts = db.posts.filter((post)=>{
            const match = post.author === args.id;
            
            if(match){
                //remove all comments asociated with that post
                db.comments = db.comments.filter(comment => comment.post !== post.id);
            }
            //put filtered post to posts array only when post's author doesn't match to id of the deleted user
            return !match;
        });
        //pick or filter only those comments whose author's id not equal to deleted author
        db.comments = db.comments.filter(comment => comment.author !== args.id);

        return deletedUser[0];
        
    },
    updateUser(parent, args, {db}, info){
            const {id, data} = args;
            const user = db.users.find((user)=> user.id === id);
            if(!user){
                throw new Error("No user found");
            }
            if(typeof data.email === 'string'){
                const emailTaken = db.users.some((user)=> user.email === data.email);
                if(emailTaken){
                    throw new Error("Email allready taken!");
                }
                user.email = data.email;
            }
            if(typeof data.name === 'string'){
                user.name = data.name;
            }
            if(typeof data.age !== 'undefined'){
                user.age = data.age;
            }
            return user;
    },
    createPost(parent, args, {db,pubsub}, info){
        const authorExist = db.users.some((user)=> user.id === args.data.author );
        if(!authorExist){
            throw new Error("No such author exists!");
        }
        const post = {
            id: uuidv4(),
            ...args.data
        }
        db.posts.push(post);
        if(post.published){
            pubsub.publish('post',{
                post:{
                    mutation: 'CREATED',
                    data : post
                }
            });
        }
        
        return post;
    },
    deletePost(parent, args, {db,pubsub}, info){
        const findIndex = db.posts.findIndex((post)=> post.id === args.id);

        if(findIndex === -1){
            throw new Error("No post found to delete!!");
        }

        const [post] = db.posts.splice(findIndex,1);
        console.log(post);
        db.comments = db.comments.filter((comment)=> comment.post !== args.id);
        //notify only published deleted post
        if(post.published){
            pubsub.publish('post',{
                post:{
                    mutation: "DELETED",
                    data:  post
                }
            })
        }
        return post;
    },
    updatePost(parent, args, {db,pubsub},info){
        const { id,data} = args;
        const post = db.posts.find((post)=> post.id === id);
        const originalPost = { ...post };
        if(!post){
            throw new Error("No post found!")
        }
        if(typeof data.title === 'string'){
            post.title = data.title;
        }
        if(typeof data.body === 'string'){
            post.body = data.body;
        }
        if(typeof data.published === 'boolean'){
            post.published = data.published
            //if user changes the publish status check with the following conditions...
            if(originalPost.published && !post.published){
                //deleted
                pubsub.publish('post',{
                    post:{
                        mutation: 'DELETED',
                        data: originalPost //imagine someone might changed the body and title but drafted it, means unpublished it so we've to notify with old post being deleted
                    }
                })
            }else if(!originalPost.published && post.published){
                //created
                pubsub.publish('post',{
                    post:{
                        mutation: 'CREATED',
                        data: post
                    } 
                })
            }
        }else if(post.published){
            //updated
            pubsub.publish('post',{
                post:{
                    mutation: 'UPDATED',
                    data: post 
                }    
            })
        }
        return post;
    },
    createComment(parent, args, {db,pubsub}, info){
        //also check whather post is published or not
        const postExists = db.posts.some((post)=> post.id === args.data.post && post.published);
        const userExists = db.users.some((user)=> user.id === args.data.author);
        if(!postExists){
            throw new Error("no such post exists!!");
        }
        if(!userExists){
            throw new Error("no such user exists!!");
        }
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment);
        //publish object with same type defination as written in schema
        pubsub.publish(`comment ${args.data.post}`,{
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        });
        return comment;
    },
    updateComment(parent, args, {db,pubsub},info){
        const {id, data} = args;
        const comment = db.comments.find(comment=> comment.id === id );
        if(!comment){
            throw new Error("No comment found!")
        }
        if(typeof data.text === 'string'){
            comment.text = data.text;
        }
        pubsub.publish(`comment ${comment.post}`,{
            comment:{
                mutation: "UPDATED",
                data: comment
            }
        })
        return comment;
    },
    deleteComment(parent, args, {db,pubsub}, inf){
        const findIndex = db.comments.findIndex((comment)=> comment.id === args.id );

        if( findIndex === -1){
            throw new Error("No such comment is found!!");
        }

        const [deletedComment] = db.comments.splice(findIndex,1);
        pubsub.publish(`comment ${deletedComment.post}`,{
            comment:{
                mutation: "DELETED",
                data: deletedComment
            }
        })
        return deletedComment;
    }
}

export { Mutation as default }