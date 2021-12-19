// 这个file是可以用到许多地方的
const jwt = require('jsonwebtoken');
// next！
module.exports = function(req, res, next) {
// 如果没有username，res.send， 如果有username，我add it to the request obj =>
// 这样的话，any further api calls within this request will included that usermane
    const username = req.session.username;
    if (!username) {
        res.status(401).send('Unauthorized: No session available');
    } else {
        req.username = username;
        next();
    }
    // const token = req.cookies.huntersCookie;  
    // // Get the token out of the cookie and request.  This is made easy to ready by cookie-parser
    // if (!token) {
    //     // If the cookie is missue, send back an error
    //     res.status(401).send('Unauthorized: No token provided');
    // } else {
    //     // Check that the token is valid and not expired
    //     jwt.verify(token, "SUPER_DUPER_SECRET", function(err, decoded) {
    //         // If it's not a good token, send an exception!
    //         if (err) {
    //             res.status(401).send('Unauthorized: Invalid token');
    //         } else {
    //             // Add 'username' as part of the request object so
    //             // so that the next function can use it
    //             req.username = decoded.username;
    //             // next calls the following function in the route chain，比如whoisloggedin里面，auth_middleare
    //             next();
    //         }
    //     });
    // }
}