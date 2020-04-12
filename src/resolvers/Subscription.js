const Subscription = {
        comment:{
            subscribe(parent,args,{db,pubsub},info){
                const { postId } = args;
                const post = db.posts.find((post)=> post.id === postId && post.published);
                if(!post){
                    throw new Error("No post found!")
                }
                //publish the new comment form createComment mutation
                return pubsub.asyncIterator(`comment ${postId}`)
            }
        },
        post:{
            subscribe(parent,args,{db,pubsub},info){
                return pubsub.asyncIterator('post');
            }
        }
}

export {Subscription as default}