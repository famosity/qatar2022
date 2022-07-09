const {Schema, model} = require('mongoose');
import bcrypt from "bcryptjs" 

const userSchema = Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role'
        }
    ]
},{
    timestamps:true,
    versionKey: false,
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = bcrypt.genSaltSync(10); //valor 10 por defecto
   return bcrypt.hashSync(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return bcrypt.compareSync(password,receivedPassword)
}

export default model('User', userSchema)