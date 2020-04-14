const Subscription = {
        comment:{
            subscribe(parent,args,{ prisma },info){
                const { postId } = args;
                return prisma.subscription.comment({
                   where:{
                        node:{
                            post:{
                                id: postId
                            }
                        }
                   } 
                },info)
            }
        },
        post:{
            subscribe(parent,args,{ prisma },info){
                return prisma.subscription.post(null,info)
            }
        }
}

export {Subscription as default}