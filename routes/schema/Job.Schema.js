const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({   
    id: String, 
    title: String,
    location: String,
    companyName: String,
    description: String,
    employerEmail: String,
    companyLink: String,
    postdate: String,
    owner: String
}, { collection : 'jobs' });
