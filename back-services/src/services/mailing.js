import { allMailing } from '../repositories/allMailing.js'; 

export const getEmailAllUser = async()=>{
  const emails=[]
  const users=await allMailing();
  
  await users.forEach(user=>{
    emails.push(user.email)
  })
  return emails
}
