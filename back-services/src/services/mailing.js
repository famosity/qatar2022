// const User = require('../models/User');
// import {User} from '../models/User'
// const{allMailing}=require('../repositories/allMailing');
import { allMailing } from '../repositories/allMailing.js'; 

export const getEmailAllUser = async()=>{
  const emails=[]
  const users=await allMailing();
  // const users=await User.find();
  await users.forEach(user=>{
      emails.push(user.email)
  })
  console.log(emails)
  return emails
}

// module.exports ={
//   getEmailAllUser
// }