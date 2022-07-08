// const User = require('../models/User');
import User from "../models/User";

// const find = async (users) => {
//     // const users = await User.find();
//     return User.find(users);
// }

// module.exports = {
//   find
// }

// import User from "../models/User";

export const allMailing = async () => {
    console.log("llegue perro")
    const allMailing = await User.find();
    console.log("llegue perro")
    console.log(allMailing)
    return allMailing;
}

// module.exports ={
//   allMailing
// }