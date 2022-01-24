// Route to get all user
const db1 = require("../db");

module.exports = function (app,fs) {
    app.get("/getStatusOfAllicationById/:appId/:tableName", 
        (req, res) => {
            try {
                const appId = req.params.appId
                const tableName = req.params.tableName
                console.log(appId, tableName)
                db1.query(`SELECT * FROM ${tableName} WHERE app_id = ?`,[appId],
                    (err, result) => {
                        if (err) {
                            console.log("db fetch error->", err)
                            res.status(202).send("Error in fetching data from database")
                        }
                        else {
                            console.log("status sent")
                            res.status(200).send(result)
                        }
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })

    app.put("/updateStatusOfAllicationById", 
        (req, res) => {
            try {

                const appId = req.body.appId
                const dateFormate = req.body.dateFormate
                const tableName = req.body.tableName
                const comments = req.body.comments
                const nextColumn = req.body.nextColumn
                const currentColumn = req.body.currentColumn
                
                console.log(appId, tableName)
                db1.query(`UPDATE  ${tableName} SET ${currentColumn} = ?,${nextColumn} = ? WHERE app_id = ?`,[comments,dateFormate,appId],
                    (err, result) => {
                        if (err) {
                            console.log("db update error->", err)
                            res.status(202).send("Error in updating data in database")
                        }
                        else {
                            console.log("status sent")
                            res.status(200).send("Status updated Successfully")
                        }
                    })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })

        
}



