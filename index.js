const express =  require("express");
const cors =  require("cors");
const app = express()
app.use(express.json())
app.use(cors())
const db = require("./db");

require('./indexAdd')(app);

app.listen(3001,() =>{
    console.log("Server connected successfuly on 3001")
}
)

