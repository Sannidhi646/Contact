const express=require("express");
const { errorhandle } = require("./middlewarehandler/errorhandle.js");
const dotenv=require("dotenv").config();
const connectDb=require("./Congig/dbConnections.js")

connectDb();
const app=express();

app.use(express.json());

app.use("/api/contacts",require("./Routs/ContactRouts.js"));
app.use("/api/users",require("./Routs/UserRouts.js"));
app.use(errorhandle);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}
);

