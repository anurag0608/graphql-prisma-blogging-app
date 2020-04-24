
import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import getClient from "./utils/getClient"
import seedDatabase from "./utils/seedDatabase"

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