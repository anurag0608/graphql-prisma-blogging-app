
import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import getClient from "./utils/getClient"
import prisma from '../src/prisma'
import seedDatabase,{userOne,postOne,postTwo} from "./utils/seedDatabase"

const client = getClient()

beforeEach(async ()=>{
   await seedDatabase()
},60000)

test("should expose all public posts",async ()=>{
    const getPosts = gql`
        query{
            posts {
                id
                title
                body
                published
            }
        }
    `
    const response = await client.query({
        query: getPosts
    })
    // console.log(response)
    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
},60000)

test("should expose myposts",async ()=>{
    const client = getClient(userOne.jwt)
    const myPosts = gql`
        query{
            myPosts{
                id
                title
                body
                published
            }
        }
    `
    const {data} = await client.query({
        query: myPosts
    })
    expect(data.myPosts.length).toBe(2)
},60000)

test('should be able to update a post',async ()=>{
    const client = getClient(userOne.jwt)
    const updatePost = gql`
        mutation{
            updatePost(
                id:"${postOne.post.id}",
                data:{
                    title:"changed"
                }
            ){
                id
                title
                body
                published
            }
        }
    `
    const { data } = await client.mutate({
        mutation: updatePost
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
    const createPost = gql`
        mutation{
            createPost(
                data:{
                    title:"this is my test new post!!",
                    body:"..",
                    published:true
                }
            ){
                id
                title
                body
                published
            }
        }
    `
    const {data} = await client.mutate({
        mutation: createPost
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
    const deletePost = gql`
        mutation{
            deletePost(
                    id:"${postTwo.post.id}"
            ){
                id
            }
        }
    `
    const {data} = await client.mutate({
        mutation: deletePost
    })
    const exists = await prisma.exists.Post({
        id: data.deletePost.id
    })
    expect(exists).toBe(false)
},60000)