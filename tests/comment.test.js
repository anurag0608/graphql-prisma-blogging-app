
import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import getClient from "./utils/getClient"
import prisma from '../src/prisma'
import {gql} from 'apollo-boost'
import seedDatabase,{userOne,userTwo, commentTwo, commentOne} from "./utils/seedDatabase"
import {deleteComment} from './utils/operations'

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