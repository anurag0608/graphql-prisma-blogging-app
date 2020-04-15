import getUserid from '../utils/getUserid'
const User = {
    email : {
        fragment:'fragment Userid on User{ id }',
        resolve(parent, args, {prisma, request}, info){
            const userId = getUserid(request, false)
            //if parent id is equal to authenticated user's id (which is being tried to fetch from db) then we can return reqired email id 
            //else return null
            //so if i logged in as X then I can fetch my email id but if i'll try to fetch Y's email id it'll return null
            if(userId && userId === parent.id){
                return parent.email
            }else{
                return null
            }
        }
    }
}

export {User as default}