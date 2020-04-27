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
const getPosts = gql`
query{
    posts {
        id
        title
        body
        published
    }
}`
const myPosts = gql`
query{
    myPosts{
        id
        title
        body
        published
    }
}`
const updatePost = gql`
mutation($data:updatePostInput!,$id:ID!){
    updatePost(
        id:$id,
        data:$data
    ){
        id
        title
        body
        published
    }
}`
const createPost = gql`
mutation($data:createPostInput!){
    createPost(
        data:$data
    ){
        id
        title
        body
        published
    }
}`
const deletePost = gql`
        mutation($id:ID!){
            deletePost(
                    id:$id
            ){
                id
            }
        }
    `
const deleteComment = gql`
    mutation($id:ID!){
        deleteComment(
            id: $id
        ){
            id
        }
    }
`
const subscribeToComments = gql`
    subscription($postId:ID!){
        comment(postId:$postId){
            mutation
            node{
                id
                text
            }
        }
    }
`
const subscribeToPosts = gql`
    subscription{
        post{
            mutation
            node{
                id
                title
                body
            }
        }
    }
`
export{
    createUser,getProfile,login,getUsers,
    getPosts,myPosts,updatePost,createPost,deletePost,subscribeToPosts,
    deleteComment,subscribeToComments
}