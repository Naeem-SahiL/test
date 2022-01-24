// Route to get all user
const db1 = require("../db");


module.exports = function (app) {
    app.get("/getCompanyRenewalData", 
        (req, res) => {
            try {
                db1.query("SELECT company_renewal.*,users.username FROM `company_renewal` LEFT JOIN users on users.user_id = company_renewal.created_by ORDER BY app_id DESC",
                    (err, result) => { 
                        if (err) {
                            res.status(202).send("Error in fetching data from database")
                        }
                        else {
                            console.log("result")
                            res.status(200).send(result)
                        } 
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })

        
    app.get("/getCompanyRenewalDataById/:appId", 
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM company_renewal WHERE app_id = ?",[appId],
                    (err, result) => {
                        if (err) { 
                            console.log(err)
                            res.status(202).send("Error in fetching data from database")
                        }
                        else {
                            console.log(result)
                            res.status(200).send(result)
                        }
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })
 
        
    app.put("/updateCompanyRenewalData", 
        (req, res) => {
            try {
                db1.query("SELECT company_renewal.*,users.username FROM `company_renewal` LEFT JOIN users on users.user_id = company_renewal.created_by ORDER BY app_id DESC",
                    (err, result) => {
                        if (err) {
                            res.status(202).send("Error in fetching data from database")
                        }
                        else {
                            console.log("result")
                            res.status(200).send(result)
                        }
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })

        
    app.post("/submitCompanyRenewalData", 
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate

                console.log(appId)
                db1.query("INSERT INTO _company_renewal_status(app_id,submittted) VALUES (?,?);",[appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else { 
                            console.log("result")
                            db1.query("UPDATE company_renewal SET submitted = 1 WHERE app_id = ?", [appId], (err, result) =>{
                                if (err) {
                                    console.log(err)
                                    res.status(202).send("Error in updateing data in database. Please Try again")
                                }
                                else{
                                    res.status(200).send("Submitted Successfully")
                                }
                            })
                        }
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message) 
                res.status(202).send("Exception occured during database query")
            }
        })
}



