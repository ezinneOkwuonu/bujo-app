// require dependencies
let express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    database = require('./database'),
    bodyParser = require('body-parser');

//Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
        console.log("Connected to Database")
    },
    error => {
        console.log("Cannot connect to Database. Error: " + error)
    })

const postAPI = require('./routes/post.route')
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors());

//API
app.use('/api', postAPI)

//create port, listen on 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Listening on port ' + port)
})

//error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});