import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    isActive: { type: Boolean, default: false, },
}, { timestamps: true })

userSchema.methods.copmarePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema);

export default User