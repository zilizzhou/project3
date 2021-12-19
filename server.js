const express = require('express');
const users = require('./routes/user.js');
const jobs = require('./routes/jobs.js');
const cors = require('cors');

const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
// session auth
const session = require('express-session')
const MongoStore = require('connect-mongo');

const mongoString = 'mongodb+srv://ziliqianlin:qianlinzili@webdev.ypxxd.mongodb.net/ziliqianlin?retryWrites=true&w=majority'
mongoose.connect(mongoString, { useNewUrlParser: true })
const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
const app = express();

app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));
app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', users);
app.use('/api/jobs', jobs);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
  

console.log("start server num")
app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});
