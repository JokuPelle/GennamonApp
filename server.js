const express = require("express");
const bodyparser = require("body-parser"); //Help with taking requests and reading through the request body
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

const users = require("./routes/api/users");
const login = require("./routes/api/login");

//Body-Parser Setup
app.use(bodyparser.json());
app.use(cookieParser());

//MongoDB Setup
const db = require("./config/keys").mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

//Use routes
app.use("/api/users", users);
app.use("/api/login", login);

app.get("/api/customers", (req, res) => {
    const customers = [
        {id: 1, firstname: "Juuso", lastname: "Ylikoski"},
        {id: 2, firstname: "Atte", lastname: "Koivunen"},
        {id: 3, firstname: "Joosua", lastname: "Lahti"}
    ];
    res.json(customers); //Lähettää responsen eli listan json muodossa
});

/*app.get("/api/users", (req, res) => {
    const users = [
        {id: 1, username: "Joku Pelle"},
        {id: 2, username: "Attek7"}
    ];
    res.json(users);
});*/
//React runs on port 3000 so server runs on 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on ${port}.`));