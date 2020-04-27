import {gql} from 'apollo-boost'
// using graphql vars
const createUser = gql`
    mutation($data:createUserInput!) {
        createUser(
            data: $data
        ){
            token
            user{
                id
            }
        }
     }
    `
const getUsers = gql`
        query {
            users {
                id
                name
                email
            }
        }
`
const login = gql`
    mutation($data:LoginUserInput!){
        LogIn(
            data:$data
        ){
            token
        }
    }
`
const getProfile = gql`
query{
    me{
        id
        name
        email
    }
}`

export{createUser,getProfile,login,getUsers}