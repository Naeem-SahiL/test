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
            key === 'leaseAgrement'
            || key === 'powerOfAttorny'
            || key === 'originalTradingLicense'
        )
            if (item[key] !== '') {
                let dest = `./public/${item[key]}`
                await unlinkAsync(dest)
            }
    })
}
module.exports = function (app, upload, unlinkAsync) {

    app.post("/insertRenewalTradingLicense", upload.fields(
        [
            { name: 'leaseAgrement' },
            { name: 'powerOfAttorny' },
            { name: 'originalTradingLicense' },
        ]),
        (req, res) => {
            try {
                var leaseAgrement = ''
                var originalTradingLicense = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['leaseAgrement'])
                    leaseAgrement = req.files['leaseAgrement'][0].filename

                if (req.files['originalTradingLicense'])
                    originalTradingLicense = req.files['originalTradingLicense'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const deposit = req.body.deposit
                const companyName = req.body.companyName
                const clientName = req.body.clientName


                const query = "INSERT INTO renewal_trading_license(deposit,\
                    leaseAgrement,\
                    powerOfAttorny,\
                    originalTradingLicense,\
                    companyName,\
                    clientName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,CURDATE())"
                const array = [deposit,
                    leaseAgrement,
                    powerOfAttorny,
                    originalTradingLicense,
                    companyName,
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



    app.put("/updateRenewalTradingLicenseDataById", upload.fields(
        [
            { name: 'leaseAgrement' },
            { name: 'powerOfAttorny' },
            { name: 'originalTradingLicense' },
        ]),
        (req, res) => {
            try {
                var leaseAgrement = ''
                var powerOfAttorny = ''
                var originalTradingLicense = ''
                if (req.files['leaseAgrement'])
                    leaseAgrement = req.files['leaseAgrement'][0].filename
                else
                    leaseAgrement = req.body.leaseAgrement

                if (req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny

                if (req.files['originalTradingLicense'])
                    originalTradingLicense = req.files['originalTradingLicense'][0].filename
                else
                    originalTradingLicense = req.body.originalTradingLicense




                const clientId = req.body.clientId
                const deposit = req.body.deposit
                const companyName = req.body.companyName
                const clientName = req.body.clientName
                const app_id = req.body.app_id


                const query = "UPDATE renewal_trading_license SET deposit=?,\
                    leaseAgrement=?,\
                    powerOfAttorny=?,\
                    originalTradingLicense=?,\
                    companyName=?,\
                    clientName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [deposit,
                    leaseAgrement,
                    powerOfAttorny,
                    originalTradingLicense,
                    companyName,
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
    app.get("/getRenewalTradingLicenseData",
        (req, res) => {
            try {
                db1.query("SELECT renewal_trading_license.* , users.username FROM `renewal_trading_license` LEFT JOIN users on users.user_id = renewal_trading_license.created_by ORDER BY app_id DESC ",
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
    app.get("/getRenewalTradingLicenseById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  renewal_trading_license WHERE app_id = ?", [appId],
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


    app.delete("/deleteRenewalTradingLicenseById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                db1.query("SELECT * FROM renewal_trading_license WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            deleteFiles(unlinkAsync, result)
                            db1.query("DELETE FROM renewal_trading_license WHERE app_id = ?", [appId], (err, result) => {
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
    app.post("/submitRenewalTradingLicenseData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _renewal_trading_license_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE renewal_trading_license SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
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


