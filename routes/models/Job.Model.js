const mongoose = require("mongoose")
const JobSchema = require('../schema/Job.Schema').JobSchema
const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}

function findJobByTitle(title) {
    return JobModel.find({ title: { $regex: ".*" + title + ".*" } }).exec();
  }


function findJobByLocation(location) {
    return JobModel.find({
        location: location
    }).exec();
}
function findJobById(id) {
    return JobModel.find({
        id: id
    }).exec();
}

function updateOneJobById(jobId, jobObject) {
    return JobModel.findOneAndUpdate(
        {id: jobId}, 
        jobObject       
    ).exec();
}



function deleteOneJobById(jobId) {
    return JobModel.deleteOne({id: jobId}).exec();
}
// function favorite(username, jobId) {
//         return UserModel.findOneAndUpdate({ username: username }, { $addToSet: { favorites: jobId } });
//     }

module.exports = {
    findJobByTitle,
    insertJob,
    findJobByLocation,
    getAllJobs,
    findJobById,
    deleteOneJobById,
    updateOneJobById
};