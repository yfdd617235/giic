import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ //porque tiene que ser new?
    username: {
        type: String,
        required: true,
        trim: true, //delete spaces
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //email unico
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true, //date of creation
},)

export default mongoose.model('User', userSchema);