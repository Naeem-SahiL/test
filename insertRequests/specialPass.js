const db1 = require("../db");

const insertData = (insertquery, arr, res) => {
    var msg = "'nothing'"
    db1.query(insertquery, arr,
        (err, result) => {
            if (err) {
                console.log("db error ->", err)
                msg = "Error in inserting data iin database"

                res.status(202).send("Error in inserting data in database")
            }
            else {
                msg = "success"
                res.status(200).send("Record inserted successfully")
            }
        })

    return msg
}

const updateData = (updatequery, arr, res) => {
    var msg = "'nothing'"
    db1.query(updatequery, arr,
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

const deleteFiles = (unlinkAsync, data) => {
    var i = 0
    var item = data[0]
    var count = Object.keys(item).length;

    Object.keys(item).forEach(async function (key) {
        if (
            key === 'powerOfAttorny'
            || key === 'applicationLetter'
        )
            if (item[key] !== '') {
                let dest = `./public/${item[key]}`
                await unlinkAsync(dest)
            }
    })
}


module.exports = function (app, upload, unlinkAsync) {
    app.post("/insertSpecialPass", upload.fields(
        [
            { name: 'powerOfAttorny' },
            { name: 'applicationLetter' },
        ]),
        (req, res) => {
            try {
                var applicationLetter = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const timeNA = req.body.timeNA
                const deposit = req.body.deposit
                const clientName = req.body.clientName


                const query = "INSERT INTO specila_pass(timeNA,\
                    deposit,\
                    powerOfAttorny,\
                    applicationLetter,\
                    clientName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,CURDATE())"
                const array = [timeNA,
                    deposit,
                    powerOfAttorny,
                    applicationLetter,
                    clientName,
                    clientId,
                    user_id]
                const msg = insertData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })



    app.put("/updateSpecialPassDataById", upload.fields(
        [
            { name: 'powerOfAttorny' },
            { name: 'applicationLetter' },
        ]),
        (req, res) => {
            try {
                var powerOfAttorny = ''
                var applicationLetter = ''
                if (req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename
                else
                    applicationLetter = req.body.applicationLetter




                const clientId = req.body.clientId
                const timeNA = req.body.timeNA
                const deposit = req.body.deposit
                const clientName = req.body.clientName
                const app_id = req.body.app_id


                const query = "UPDATE specila_pass SET timeNA=?,\
                    deposit=?,\
                    powerOfAttorny=?,\
                    applicationLetter=?,\
                    clientName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [timeNA,
                    deposit,
                    powerOfAttorny,
                    applicationLetter,
                    clientName,
                    clientId,
                    app_id]

                const msg = updateData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during file handling")
            }
        })



    //get all route
    app.get("/getSpecialPassData",
        (req, res) => {
            try {
                db1.query("SELECT specila_pass.* , users.username FROM `specila_pass` LEFT JOIN users on users.user_id = specila_pass.created_by ORDER BY app_id DESC ",
                    (err, result) => {
                        if (err) {
                            res.status(202).send("Error in fetching data from database")
                            console.log(err)
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
    app.get("/getSpecialPassById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  specila_pass WHERE app_id = ?", [appId],
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

    //delete


    app.delete("/deleteSpecialPassById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                db1.query("SELECT * FROM specila_pass WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            deleteFiles(unlinkAsync, result)
                            db1.query("DELETE FROM specila_pass WHERE app_id = ?", [appId], (err, result) => {
                                if (err) {
                                    console.log("db error ->", err)
                                    res.status(202).send("Error in deleting data in database")
                                }
                                else {
                                    res.status(200).send("Record deleted successfully")
                                }
                            })
                        } catch (e) {
                            console.log(e.errorMessage)
                            res.status(202).send("Exception occured in deleting files!")
                        }
                    }
                })
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during file handling")
            }
        })
    //submit
    app.post("/submitSpecialPassData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _specila_pass_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE specila_pass SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
                                if (err) {
                                    console.log(err)
                                    res.status(202).send("Error in updateing data in database. Please Try again")
                                }
                                else {
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




