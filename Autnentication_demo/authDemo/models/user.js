const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

userSchema.statics.findAndValidate = async function(username, password) {
    const user = await this.findOne({ username });
    if (!user) {
        return false;
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false;
}

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return ;
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);
module.exports = User;