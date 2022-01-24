const db = require("../db");

module.exports = function (app) {
// Route to get user
app.get("/get/:userId", (req, res) => {
    const userId = req.params.userId
    try{
        db.query("SELECT * FROM users WHERE user_id = ?", [userId], (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send("not found db err")
            }
            if(result.length < 1){ 
                res.send("not found")
            }
              
            else{
                res.status(200).send(result[0].role) 
                console.log("User role>",result[0].role )
            }
        })
    } 
    catch(e){
        console.log(e.message)
    }
    
});

}