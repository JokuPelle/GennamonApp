const express = require("express");
const bodyparser = require("body-parser"); //Help with taking requests and reading through the request body
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

const posts = require("./routes/api/posts");
const login = require("./routes/api/login");
const userpage = require("./routes/api/userpage");

//Body-Parser & Cookie-Parser Setup
app.use(bodyparser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Home");
});

// MongoDB setup-----------------------------------------------------------
const Promise = require("bluebird");
let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL, mongoURLLabel = "";
// Set up mongoose connection
if (mongoURL == null) {
  var mongoHost, mongoPort, mongoDatabase, mongoPassword, mongoUser;
  // If using plane old env vars via service discovery
  if (process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
    mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'];
    mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'];
    mongoDatabase = process.env[mongoServiceName + '_DATABASE'];
    mongoPassword = process.env[mongoServiceName + '_PASSWORD'];
    mongoUser = process.env[mongoServiceName + '_USER'];

  // If using env vars from secret from service binding
  } else if (process.env.database_name) {
    mongoDatabase = process.env.database_name;
    mongoPassword = process.env.password;
    mongoUser = process.env.username;
    var mongoUriParts = process.env.uri && process.env.uri.split("//");
    if (mongoUriParts.length == 2) {
      mongoUriParts = mongoUriParts[1].split(":");
      if (mongoUriParts && mongoUriParts.length == 2) {
        mongoHost = mongoUriParts[0];
        mongoPort = mongoUriParts[1];
      }
    }
  }

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;
  }
}
// Connecting to DB
mongoose.connect(mongoURL, { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
//MongoDB Atlas Setup with keystring-----------------------------------------------------
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));
*/

//Use routes
app.use("/api/posts", posts);
app.use("/api/login", login);
app.use("/userpage/api/", userpage);

//React runs on port 3000 so server runs on 8080
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, () => console.log(`Server started on ${port}.`));