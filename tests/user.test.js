import '@babel/polyfill/noConflict'
import 'cross-fetch/polyfill'
import ApolloBoost,{ gql } from 'apollo-boost'
const client = new ApolloBoost({
    uri:"http://localhost:3000"
})

test("Should create a new user",async ()=>{
    const createUser = gql`
        mutation{
            createUser(
                data:{
                    name:"xyz3",
                    email:"xyz3@xyz.com",
                    password:"123456789"
                }
            ){
                token,
                user{
                    id
                    name
                }
            }
        }
    `
    const response = await client.mutate({
        mutation: createUser
    })
})