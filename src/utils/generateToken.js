import jwt from 'jsonwebtoken'

const generateToken = (userId)=>{

    return jwt.sign({userId},"willbeasecretkey",{algorithm:'HS512',expiresIn:'2 days'})
}

export {generateToken as default}