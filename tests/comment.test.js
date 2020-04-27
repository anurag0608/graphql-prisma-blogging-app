
import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import getClient from "./utils/getClient"
import prisma from '../src/prisma'
import seedDatabase,{userOne,userTwo, commentTwo, commentOne, postOne} from "./utils/seedDatabase"
import {deleteComment,subscribeToComments, getUsers} from './utils/operations'

const client = getClient()

beforeEach(async ()=>{
   await seedDatabase()
},60000)

test("should delete own comment",async ()=>{
    const client = getClient(userTwo.jwt)
    const variables = {
        id:commentTwo.comment.id
    }
    const {data} = await client.mutate({
        mutation: deleteComment,
        variables
    })
    const exists = await prisma.exists.Comment({
        id:data.deleteComment.id
    })
    expect(exists).toBe(false)
},60000)
test("should not delete other user's comment",async ()=>{
    const client = getClient(userTwo.jwt)
    const variables = {
        id: commentOne.comment.id
    }
    await expect(
        client.mutate({
            mutation: deleteComment,
            variables
        })
    ).rejects.toThrow()
},60000)
test("should subscribe to comments", async (done)=>{
    const variables = {
        postId: postOne.post.id
    }
    client.subscribe({
        query: subscribeToComments,
        variables
    }).subscribe({
        next(response) {
            expect(response.data.comment.mutation).toBe('DELETED')
            done()  // done is neccesary because by default jest justs ignore .subscribe after some time
                    // and don't wait for subscibe to fire up
                    // to make jest to expect true only when subscribe is fired up
                    // excute done() after firing off the subscription event
        }
    })

    // change a comment to trigger the subscription event
    await prisma.mutation.deleteComment({
        where:{
            id: commentOne.comment.id
        }
    })
})