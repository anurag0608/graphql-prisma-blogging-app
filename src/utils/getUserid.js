import jwt from 'jsonwebtoken'
const getUserid = (request,authRequire = true)=>{
    const header = request.request ?
    request.request.headers.authorization :    //incase of http req 
    request.connection.context.Authorization  //incase of subscription auth header lives in thi
    
    if(header){
        const token = header.replace('Bearer ','')
        let decoded
        //it can work without try catch block also... the error will be thrown to the client
        try{
            decoded = jwt.verify(token,"willbeasecretkey",{algorithms:['HS512']})
    
        }catch(err){
            throw new Error("Invalid token")
        }
        // decoded = {userId: user.id}
        return decoded.userId
    }
    if(authRequire){
        throw new Error("Authentication required")
    }
    //else
    return null
   
}
export {getUserid as default}