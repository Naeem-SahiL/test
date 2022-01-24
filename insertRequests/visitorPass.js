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
            key === 'photo'
            || key === 'passportCopy'
            || key === 'hostPermitCopy'
            || key === 'powerOfAttorny'
            || key === 'applicationForm'
            || key === 'hostApplicationLetter'
        )
            if (item[key] !== '') {
                let dest = `./public/${item[key]}`
                await unlinkAsync(dest)
            }
    })
}





module.exports = function (app, upload, unlinkAsync) {
    app.post("/insertVisiterPass", upload.fields(
        [
            { name: 'photo' },
            { name: 'passportCopy' },
            { name: 'hostPermitCopy' },
            { name: 'powerOfAttorny' },
            { name: 'applicationForm' },
            { name: 'hostApplicationLetter' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var passportCopy = ''
                var hostPermitCopy = ''
                var applicationForm = ''
                var hostApplicationLetter = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['photo'])
                    photo = req.files['photo'][0].filename

                if (req.files['passportCopy'])
                    passportCopy = req.files['passportCopy'][0].filename

                if (req.files['hostPermitCopy'])
                    hostPermitCopy = req.files['hostPermitCopy'][0].filename

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename

                if (req.files['hostApplicationLetter'])
                    hostApplicationLetter = req.files['hostApplicationLetter'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const scanned = req.body.scanned
                const deposit = req.body.deposit
                const certified = req.body.certified
                const clientName = req.body.clientName


                const query = "INSERT INTO visitor_pass(photo,\
                    scanned,\
                    deposit,\
                    certified,\
                    passportCopy,\
                    hostPermitCopy,\
                    powerOfAttorny,\
                    applicationForm,\
                    hostApplicationLetter,\
                    clientName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [photo,
                    scanned,
                    deposit,
                    certified,
                    passportCopy,
                    hostPermitCopy,
                    powerOfAttorny,
                    applicationForm,
                    hostApplicationLetter,
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



    app.put("/updateVisiterPassDataById", upload.fields(
        [
            { name: 'photo' },
            { name: 'passportCopy' },
            { name: 'hostPermitCopy' },
            { name: 'powerOfAttorny' },
            { name: 'applicationForm' },
            { name: 'hostApplicationLetter' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var passportCopy = ''
                var hostPermitCopy = ''
                var powerOfAttorny = ''
                var applicationForm = ''
                var hostApplicationLetter = ''
                if (req.files['photo'])
                    photo = req.files['photo'][0].filename
                else
                    photo = req.body.photo

                if (req.files['passportCopy'])
                    passportCopy = req.files['passportCopy'][0].filename
                else
                    passportCopy = req.body.passportCopy

                if (req.files['hostPermitCopy'])
                    hostPermitCopy = req.files['hostPermitCopy'][0].filename
                else
                    hostPermitCopy = req.body.hostPermitCopy

                if (req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename
                else
                    applicationForm = req.body.applicationForm

                if (req.files['hostApplicationLetter'])
                    hostApplicationLetter = req.files['hostApplicationLetter'][0].filename
                else
                    hostApplicationLetter = req.body.hostApplicationLetter




                const clientId = req.body.clientId
                const scanned = req.body.scanned
                const deposit = req.body.deposit
                const certified = req.body.certified
                const clientName = req.body.clientName
                const app_id = req.body.app_id


                const query = "UPDATE visitor_pass SET photo=?,\
                    scanned=?,\
                    deposit=?,\
                    certified=?,\
                    passportCopy=?,\
                    hostPermitCopy=?,\
                    powerOfAttorny=?,\
                    applicationForm=?,\
                    hostApplicationLetter=?,\
                    clientName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [photo,
                    scanned,
                    deposit,
                    certified,
                    passportCopy,
                    hostPermitCopy,
                    powerOfAttorny,
                    applicationForm,
                    hostApplicationLetter,
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
    app.get("/getVisiterPassData",
        (req, res) => {
            try {
                db1.query("SELECT visitor_pass.* , users.username FROM `visitor_pass` LEFT JOIN users on users.user_id = visitor_pass.created_by ORDER BY app_id DESC ",
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
    app.get("/getVisiterPassById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  visitor_pass WHERE app_id = ?", [appId],
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


    app.delete("/deleteVisiterPassById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                db1.query("SELECT * FROM visitor_pass WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            deleteFiles(unlinkAsync, result)
                            db1.query("DELETE FROM visitor_pass WHERE app_id = ?", [appId], (err, result) => {
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
    app.post("/submitVisiterPassData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _visitor_pass_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE visitor_pass SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
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




