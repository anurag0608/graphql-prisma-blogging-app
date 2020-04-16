import bcrypt from 'bcryptjs'
const hashPassword = (plainTextPwd)=>{
    if(plainTextPwd.length < 8){
        throw new Error("Password length must be 8 chars or greater!")
   }
   return bcrypt.hash(plainTextPwd,12) //returns promise if call back is omited
}

export {hashPassword as default}