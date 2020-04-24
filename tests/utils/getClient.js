import ApolloBoost,{ gql } from 'apollo-boost'

const getClient = ()=>{
    return new ApolloBoost({
        uri:"http://localhost:3000"
    })
}   
export {getClient as default}