const express = require("express");
const app = express();
const main = require("./models/db");
const bookRouter = require("./routes/book");
require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/book', bookRouter);

main()
.then ( ()=> {
    return console.log("DB connected");
}) .catch(console.error);

app.listen(5000, () => {
    console.log("Server connected.....")
})
