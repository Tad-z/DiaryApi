const express = require("express");
const app = express();
const main = require("./models/db")
const diaryRouter = require("./routes/diary.rou");
require("dotenv").config()


main()
.then ( ()=> {
    return console.log("DB connected");
}) .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/diary', diaryRouter);


app.listen(4000, () => {
    console.log("Server connected.....")
})
