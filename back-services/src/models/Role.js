const {Schema, model} = require('mongoose');

export const ROLE = ['USER', 'ADMIN']

const roleSchema = Schema(
    {
        name: String,
    },
    {
        versionKey: false,
    },
)

export default model('Role', roleSchema)