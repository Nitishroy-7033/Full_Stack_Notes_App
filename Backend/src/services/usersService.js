const User = require('../models/user');


const createUserAsync = async (userName, emailId, password) => {
    const newUser = new User({
        userName: userName,
        emailId: emailId,
        password: password
    });
    await newUser.save();
    return newUser;
};

const getAllUsersAsync = async () => {
    return await User.find();
};

const getUserByIdAsync = async (id) => {
    const user = await User.findById(id); 
    return user;    
}

const getUserByEmailAsync = async (emailId) => {
    const user = await User.findOne({ emailId: emailId });
    return user;
}


module.exports = {
    createUserAsync,
    getAllUsersAsync,
    getUserByIdAsync,
    getUserByEmailAsync
};