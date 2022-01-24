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
            || key === 'memorandom'
            || key === 'passsportCopy'
            || key === 'leaseAgreement'
            || key === 'powerOfAttorny'
            || key === 'originalPermit'
            || key === 'tradingLicense'
            || key === 'applicationLetter'
            || key === 'appicationForm'
        )
            if (item[key] !== '') {
                let dest = `./public/${item[key]}`
                await unlinkAsync(dest)
            }
    })
}

module.exports = function (app, upload, unlinkAsync) {
    app.post("/insertDirectorPermitAdditional", upload.fields(
        [
            { name: 'photo' },
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'memorandom' },
            { name: 'passsportCopy' },
            { name: 'leaseAgreement' },
            { name: 'powerOfAttorny' },
            { name: 'originalPermit' },
            { name: 'tradingLicense' },
            { name: 'applicationLetter' },
            { name: 'appicationForm' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var formJ = ''
                var formC = ''
                var memorandom = ''
                var passsportCopy = ''
                var leaseAgreement = ''
                var originalPermit = ''
                var tradingLicense = ''
                var applicationLetter = ''
                var appicationForm = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['photo'])
                    photo = req.files['photo'][0].filename

                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename

                if (req.files['memorandom'])
                    memorandom = req.files['memorandom'][0].filename

                if (req.files['passsportCopy'])
                    passsportCopy = req.files['passsportCopy'][0].filename

                if (req.files['leaseAgreement'])
                    leaseAgreement = req.files['leaseAgreement'][0].filename

                if (req.files['originalPermit'])
                    originalPermit = req.files['originalPermit'][0].filename

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename

                if (req.files['appicationForm'])
                    appicationForm = req.files['appicationForm'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const certified = req.body.certified
                const applicationFee = req.body.applicationFee
                const clientName = req.body.clientName
                const companyName = req.body.companyName


                const query = "INSERT INTO director_permit_additional(photo,\
                    formJ,\
                    formC,\
                    certified,\
                    memorandom,\
                    passportCopy,\
                    applicationFee,\
                    leaseAgreement,\
                    powerOfAttorny,\
                    originalPermit,\
                    tradingLicense,\
                    applicationLetter,\
                    appicationForm,\
                    clientName,\
                    companyName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [photo,
                    formJ,
                    formC,
                    certified,
                    memorandom,
                    passsportCopy,
                    applicationFee,
                    leaseAgreement,
                    powerOfAttorny,
                    originalPermit,
                    tradingLicense,
                    applicationLetter,
                    appicationForm,
                    clientName,
                    companyName,
                    clientId,
                    user_id]
                const msg = insertData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })



    app.put("/updateDirectorPermitAdditionalDataById", upload.fields(
        [
            { name: 'photo' },
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'memorandom' },
            { name: 'passsportCopy' },
            { name: 'leaseAgreement' },
            { name: 'powerOfAttorny' },
            { name: 'originalPermit' },
            { name: 'tradingLicense' },
            { name: 'applicationLetter' },
            { name: 'appicationForm' },
        ]),
        (req, res) => {
            try {
                var photo = ''
                var formJ = ''
                var formC = ''
                var memorandom = ''
                var passsportCopy = ''
                var leaseAgreement = ''
                var powerOfAttorny = ''
                var originalPermit = ''
                var tradingLicense = ''
                var applicationLetter = ''
                var appicationForm = ''
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

                if (req.files['memorandom'])
                    memorandom = req.files['memorandom'][0].filename
                else
                    memorandom = req.body.memorandom

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

                if (req.files['originalPermit'])
                    originalPermit = req.files['originalPermit'][0].filename
                else
                    originalPermit = req.body.originalPermit

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename
                else
                    tradingLicense = req.body.tradingLicense

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename
                else
                    applicationLetter = req.body.applicationLetter

                if (req.files['appicationForm'])
                    appicationForm = req.files['appicationForm'][0].filename
                else
                    appicationForm = req.body.appicationForm




                const clientId = req.body.clientId
                const certified = req.body.certified
                const applicationFee = req.body.applicationFee
                const clientName = req.body.clientName
                const companyName = req.body.companyName
                const app_id = req.body.app_id


                const query = "UPDATE director_permit_additional SET photo=?,\
                    formJ=?,\
                    formC=?,\
                    certified=?,\
                    memorandom=?,\
                    passportCopy=?,\
                    applicationFee=?,\
                    leaseAgreement=?,\
                    powerOfAttorny=?,\
                    originalPermit=?,\
                    tradingLicense=?,\
                    applicationLetter=?,\
                    appicationForm=?,\
                    clientName=?,\
                    companyName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [photo,
                    formJ,
                    formC,
                    certified,
                    memorandom,
                    passsportCopy,
                    applicationFee,
                    leaseAgreement,
                    powerOfAttorny,
                    originalPermit,
                    tradingLicense,
                    applicationLetter,
                    appicationForm,
                    clientName,
                    companyName,
                    clientId,
                    app_id]

                const msg = updateData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during file handling")
            }
        })



    app.get("/getDirectorPermitAdditionalData",
        (req, res) => {
            try {
                db1.query("SELECT director_permit_additional.* , users.username FROM `director_permit_additional` LEFT JOIN users on users.user_id = director_permit_additional.created_by ORDER BY app_id DESC ",
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
    app.get("/getDirectorPermitAdditionalById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  director_permit_additional WHERE app_id = ?", [appId],
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


    app.delete("/deleteDirectorPermitAdditionalById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                db1.query("SELECT * FROM director_permit_additional WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            deleteFiles(unlinkAsync, result)
                            db1.query("DELETE FROM director_permit_additional WHERE app_id = ?", [appId], (err, result) => {
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
    app.post("/submitDirectorPermitAdditionalData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _director_permit_additional_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE director_permit_additional SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
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



