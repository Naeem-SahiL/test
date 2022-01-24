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
            || key === 'formJ'
            || key === 'formC'
            || key === 'memorandomOfCompony'
            || key === 'medicalCertificate'
            || key === 'policeClearance'
            || key === 'passsportCopy'
            || key === 'leaseAgreement'
            || key === 'powerOfAttorny'
            || key === 'tradingLicense'
            || key === 'applicationLetter'
            || key === 'applicationForm'
        )
            if (item[key] !== '') {
                let dest = `./public/${item[key]}`
                await unlinkAsync(dest)
            }
    })
}


module.exports = function (app, upload, unlinkAsync) {

    app.post("/insertExistingBusinessPermit", upload.fields(
        [
            { name: 'photo' },
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'memorandomOfCompony' },
            { name: 'medicalCertificate' },
            { name: 'policeClearance' },
            { name: 'passsportCopy' },
            { name: 'leaseAgreement' },
            { name: 'powerOfAttorny' },
            { name: 'tradingLicense' },
            { name: 'applicationLetter' },
            { name: 'applicationForm' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var formJ = ''
                var formC = ''
                var memorandomOfCompony = ''
                var medicalCertificate = ''
                var policeClearance = ''
                var passsportCopy = ''
                var leaseAgreement = ''
                var tradingLicense = ''
                var applicationLetter = ''
                var applicationForm = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['photo'])
                    photo = req.files['photo'][0].filename

                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename

                if (req.files['memorandomOfCompony'])
                    memorandomOfCompony = req.files['memorandomOfCompony'][0].filename

                if (req.files['medicalCertificate'])
                    medicalCertificate = req.files['medicalCertificate'][0].filename

                if (req.files['policeClearance'])
                    policeClearance = req.files['policeClearance'][0].filename

                if (req.files['passsportCopy'])
                    passsportCopy = req.files['passsportCopy'][0].filename

                if (req.files['leaseAgreement'])
                    leaseAgreement = req.files['leaseAgreement'][0].filename

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const certified = req.body.certified
                const companyName = req.body.companyName
                const clientName = req.body.clientName


                const query = "INSERT INTO existing_business_permit(photo,\
                    formJ,\
                    formC,\
                    certified,\
                    memorandomOfCompony,\
                    medicalCertificate,\
                    policeClearance,\
                    passsportCopy,\
                    leaseAgreement,\
                    powerOfAttorny,\
                    tradingLicense,\
                    applicationLetter,\
                    applicationForm,\
                    companyName,\
                    clientName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [photo,
                    formJ,
                    formC,
                    certified,
                    memorandomOfCompony,
                    medicalCertificate,
                    policeClearance,
                    passsportCopy,
                    leaseAgreement,
                    powerOfAttorny,
                    tradingLicense,
                    applicationLetter,
                    applicationForm,
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



    app.put("/updateExistingBusinessPermitDataById", upload.fields(
        [
            { name: 'photo' },
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'memorandomOfCompony' },
            { name: 'medicalCertificate' },
            { name: 'policeClearance' },
            { name: 'passsportCopy' },
            { name: 'leaseAgreement' },
            { name: 'powerOfAttorny' },
            { name: 'tradingLicense' },
            { name: 'applicationLetter' },
            { name: 'applicationForm' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var formJ = ''
                var formC = ''
                var memorandomOfCompony = ''
                var medicalCertificate = ''
                var policeClearance = ''
                var passsportCopy = ''
                var leaseAgreement = ''
                var powerOfAttorny = ''
                var tradingLicense = ''
                var applicationLetter = ''
                var applicationForm = ''
                if (req.files['photo'])
                    photo = req.files['photo'][0].filename
                else
                    photo = req.body.photo

                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename
                else
                    formJ = req.body.formJ

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename
                else
                    formC = req.body.formC

                if (req.files['memorandomOfCompony'])
                    memorandomOfCompony = req.files['memorandomOfCompony'][0].filename
                else
                    memorandomOfCompony = req.body.memorandomOfCompony

                if (req.files['medicalCertificate'])
                    medicalCertificate = req.files['medicalCertificate'][0].filename
                else
                    medicalCertificate = req.body.medicalCertificate

                if (req.files['policeClearance'])
                    policeClearance = req.files['policeClearance'][0].filename
                else
                    policeClearance = req.body.policeClearance

                if (req.files['passsportCopy'])
                    passsportCopy = req.files['passsportCopy'][0].filename
                else
                    passsportCopy = req.body.passsportCopy

                if (req.files['leaseAgreement'])
                    leaseAgreement = req.files['leaseAgreement'][0].filename
                else
                    leaseAgreement = req.body.leaseAgreement

                if (req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename
                else
                    tradingLicense = req.body.tradingLicense

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename
                else
                    applicationLetter = req.body.applicationLetter

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename
                else
                    applicationForm = req.body.applicationForm




                const clientId = req.body.clientId
                const certified = req.body.certified
                const companyName = req.body.companyName
                const clientName = req.body.clientName
                const app_id = req.body.app_id


                const query = "UPDATE existing_business_permit SET photo=?,\
                    formJ=?,\
                    formC=?,\
                    certified=?,\
                    memorandomOfCompony=?,\
                    medicalCertificate=?,\
                    policeClearance=?,\
                    passsportCopy=?,\
                    leaseAgreement=?,\
                    powerOfAttorny=?,\
                    tradingLicense=?,\
                    applicationLetter=?,\
                    applicationForm=?,\
                    companyName=?,\
                    clientName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [photo,
                    formJ,
                    formC,
                    certified,
                    memorandomOfCompony,
                    medicalCertificate,
                    policeClearance,
                    passsportCopy,
                    leaseAgreement,
                    powerOfAttorny,
                    tradingLicense,
                    applicationLetter,
                    applicationForm,
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
    app.get("/getExistingBusinessPermitData",
        (req, res) => {
            try {
                db1.query("SELECT existing_business_permit.* , users.username FROM `existing_business_permit` LEFT JOIN users on users.user_id = existing_business_permit.created_by ORDER BY app_id DESC ",
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

    app.get("/getExistingBusinessPermitById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  existing_business_permit WHERE app_id = ?", [appId],
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


    app.delete("/deleteExistingBusinessPermitById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                // console.log(appId)
                db1.query("SELECT * FROM existing_business_permit WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            deleteFiles(unlinkAsync, result)
                            db1.query("DELETE FROM existing_business_permit WHERE app_id = ?",[appId],(err,result)=>
                            {
                                if (err) {
                                    console.log("db error ->", err)
                                    res.status(202).send("Error in deleting data in database")
                                }
                                else {
                                    res.status(200).send("Record deleted successfully")
                                }
                            })
                        } catch (e) {
                            console.log(e)
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
    app.post("/submitExistingBusinessPermitData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _existing_business_permit_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE existing_business_permit SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
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



