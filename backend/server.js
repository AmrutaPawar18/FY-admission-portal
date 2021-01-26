const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

//Body parser middleware

app.use(cors());
app.use(express.json());

//Configuring db
const db = require('./config/keys').mongoURI;

const users = require("./routes/Users");
const recruiters = require("./routes/recr");
const applicants = require("./routes/appl");
const files = require("./routes/file");
//const recruiters = require("./routes/Recruiters");
//connecting to db
mongoose
    .connect(db, { 
    	useUnifiedTopology: true, 
    	useNewUrlParser: true,
    	useCreateIndex: true,
        useFindAndModify: false,
    });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

//Use routes
app.use("/user",users);
app.use("/appl", applicants);
app.use("/recr", recruiters);
app.use("/file", files);
app.use("/uploads", express.static('uploads'))
    
    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));   
    //we want our app to listen for requests on the specified port
    // the function is callback, it logs when it begins listening

