import jwt from 'jsonwebtoken'
const getUserid = (request)=>{
    const header = request.request.headers.authorization
    if(!header){
        throw new Error("Authentication required")
    }
    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token,"willbeasecretkey",{algorithms:['HS512']})
    // decoded = {userId: user.id}
    return decoded.userId
}
export {getUserid as default}