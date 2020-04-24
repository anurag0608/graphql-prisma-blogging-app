import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import getClient from "./utils/getClient"
import seedDatabase ,{userOne}from "./utils/seedDatabase";

const client = getClient()

beforeEach(async ()=>{
   await seedDatabase()
},60000) //jest timeout

test("should expose public author profile",async ()=>{
    const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
    `
    const response = await client.query({
        query: getUsers
    })
    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].name).toBe('axdu')
    //check email should be null because user is not authenticated
    expect(response.data.users[0].email).toBe(null)

},60000)

test("should not login with wrong credentials",async ()=>{
    //to expect failed methods to success test case use .toThrow() method of JEST
    const login = gql`
        mutation{
            LogIn(
                data:{
                    email:"axdu.something@something.com",
                    password:"12345"
                }
            ){
                token
            }
        }
    `
    //client.mutate returns a promise
    //by default expect(..).toBe(..) resolves  synchornous func
    // means inside expect if u'll write a async func which retuns promise , expect will neglect it
    //so use .resolves and .rejetcs
    // for more info --> https://jestjs.io/docs/en/expect#resolves
    await expect(
        client.mutate({ mutation: login})
    ).rejects.toThrow()

},60000)

test("should not signup user with invalid password",async ()=>{
    const createUser = gql`
        mutation {
            createUser(
                data:{
                    email:"something@something.com",
                    name:"annoymous",
                    password:"pass"
                }
            ){
                token
            }
        }
    `
    await expect(
        client.mutate({mutation:createUser})
    ).rejects.toThrow()
},60000)

test("should fetch user profile",async ()=>{
    const client = getClient(userOne.jwt)

    const getProfile = gql`
        query{
            me{
                id
                name
                email
            }
        }
    `
    const {data} = await client.query({
        query: getProfile
    })
    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})