
import User from "../models/User";

export const allMailing = async () => {
    const allMailing = await User.find();
    return allMailing;
}
