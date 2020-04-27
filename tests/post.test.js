
import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import getClient from "./utils/getClient"
import prisma from '../src/prisma'
import seedDatabase,{userOne,postOne,postTwo} from "./utils/seedDatabase"
import {getPosts,myPosts,updatePost,createPost,deletePost} from './utils/operations'
const client = getClient()

beforeEach(async ()=>{
   await seedDatabase()
},60000)

test("should expose all public posts",async ()=>{
   
    const response = await client.query({
        query: getPosts
    })
    // console.log(response)
    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
},60000)

test("should expose myposts",async ()=>{
    const client = getClient(userOne.jwt)
   
    const {data} = await client.query({
        query: myPosts
    })
    expect(data.myPosts.length).toBe(2)
},60000)

test('should be able to update a post',async ()=>{
    const client = getClient(userOne.jwt)
    const variables = {
        data:{
            title:"changed"
        },
        id: postOne.post.id
    }
    const { data } = await client.mutate({
        mutation: updatePost,
        variables
    })
    expect(data.updatePost.published).toBe(postOne.post.published)
    const exists = await prisma.exists.Post({
        id:data.updatePost.id,
        published: true
    })
    expect(exists).toBe(true)

},60000)

test('should be able to create a new post',async ()=>{
    const client = getClient(userOne.jwt)
    const variables = {
        data:{
            title:"this is my test new post!!",
            body:"..",
            published:true
        }
    }
    const {data} = await client.mutate({
        mutation: createPost,
        variables
    })
    const exists = await prisma.exists.Post({
        id: data.createPost.id
    })
    expect(data.createPost.title).toBe("this is my test new post!!")
    expect(data.createPost.body).toBe("..")
    expect(data.createPost.published).toBe(true)
    expect(exists).toBe(true)
    expect(exists).toBe(true)

    expect(exists).toBe(true)
},60000)

test('should be able to delete the newely created post',async ()=>{
    const client = getClient(userOne.jwt)
    const variables = {
        id:postTwo.post.id
    }
    const {data} = await client.mutate({
        mutation: deletePost,
        variables
    })
    const exists = await prisma.exists.Post({
        id: data.deletePost.id
    })
    expect(exists).toBe(false)
},60000)