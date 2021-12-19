const mongoose = require("mongoose")
const UserSchema = require('../schema/User.Schema').UserSchema
const UserModel = mongoose.model("User", UserSchema);

function insertUser(user) {
    return UserModel.create(user);
}

function getAllUsers() {
    return UserModel.find().exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({ username }).exec();
}

function findFavoriteJobIdListByUsername(username) {
    return UserModel.findOne({ username }).exec();
}

function addFavoriteJobIdToList(jobId, username) {
    return UserModel.updateOne(
        { username: username }, 
        { $push: { favorites:  jobId} }
    ).exec();
}

module.exports = {
    insertUser,
    getAllUsers,
    findUserByUsername,
    findFavoriteJobIdListByUsername,
    addFavoriteJobIdToList

};