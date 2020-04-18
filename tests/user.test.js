import { getFirstName,isValidPassword } from '../src/utils/user'
test('Should return first name when given full name',()=>{
    // const firstName = getFirstName("Anurag Verma")
    // if(firstName!=='Anurag'){
    //     throw new Error('Failed to get the first name')
    // }
    expect(getFirstName('Anurag Verma')).toBe('Anurag')
})

test('Should reject password shorter than 8 chars',()=>{
    expect(isValidPassword('123456789')).toBe(true)
})

test('Should reject password contains word password',()=>{
    expect(isValidPassword('passwossrds')).toBe(true)
})