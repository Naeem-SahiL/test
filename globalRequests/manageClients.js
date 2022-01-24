const db = require("../db");

module.exports = function (app) {

app.get("/getClients", (req, res) => {

    try{
        db.query("SELECT * FROM clients", (err, result) => {
            if (err) {
                console.log(err)
                res.status(202).send("ERROR OCURED IN DATABASE. Try again")
            }
            else if(result.length < 1){ 
                res.status(202).send("No users found")
            }
            else{
                res.status(200).send(result)
                console.log("sucess fetch clients")
            }
        })
    } 
    catch(e){
        console.log(e.message)
    }
    
});

app.post("/insertClient", (req, res) => {
    const  fullName = req.body.fullName
    const  address = req.body.address
    const  email = req.body.email
    const  phone = req.body.phone

    try{
        db.query("INSERT INTO clients(name, address, phone, email) VALUES (?,?,?,?)", [fullName,address,phone,email], (err, result) => {
            if(err)
            {
                console.log(err)
                req.send("error")
                return
            }
            else{
                res.send("inserted")
                console.log("success insert")
            }
        })
    } 
    catch(e){
        console.log(e.message)
    }
    
});
app.get("/getClientDataById/:clientId", (req, res) => {

    try {
        const clientId = req.params.clientId
        db.query("SELECT * FROM `clients` WHERE clientId = ?", [clientId], (err, result) => {
            if (err) {
                console.log(err)
                res.status(202).send("Database Error Occured. Please try again with true info")
            }
            else if (result.length < 1) {
                res.status(202).send("not found")
            }
            else {
                res.status(200).send(result)
                console.log("client found")
            }
        })
    }
    catch (e) {
        console.log(e.message)
    }

});

app.put("/updateClient", (req, res) => {
    const clientId = req.body.clientId
    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const phone = req.body.phone

    try {

        const query2 = "UPDATE clients SET \
            name=?,\
            address=?,\
            email=?,\
            phone=?\
            WHERE clientId = ?"

        const array = [name,
            address,
            email,
            phone,
            clientId]

            db.query(query2, array,
                (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in updating data in database")
                    }
                    else {
                        res.status(200).send("Record updated successfully")
                    }
                })
    }
    catch (e) {
        console.log(e.message)
    }

});

}