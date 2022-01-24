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

const deleteFiles = (unlinkAsync, data) =>{
    console.log("hu")
    var i = 0
    var item = data[0]
    var count = Object.keys(item).length;

    Object.keys(item).forEach(async function(key){
        if(
            key === 'formJ'
            || key === 'formC'
            || key === 'powerOfAttorny'
            || key === 'tradingLicense'
            || key === 'applicationForm'
            || key === 'applicationLetter'
            || key === 'proofOfAdddressOfBusiness'
        )
            if(item[key]!== '')
                {
                    let dest =  `./public/${item[key]}`
                    await unlinkAsync(dest)
                }
    })
}
module.exports = function(app, upload, unlinkAsync){

    app.post("/insertSNPFRegisteration", upload.fields(
        [
            {name:'formJ'},
            {name:'formC'},
            {name:'tradingLicense'},
            {name:'powerOfAttorny'},
            {name:'applicationLetter'},
            {name:'applicationForm'},
            {name:'proofOfAdddressOfBusiness'},
        ]),
        (req, res) => {
            try {
                var formJ = ''
                var formC = ''
                var tradingLicense = ''
                var applicationForm = ''
                var applicationLetter = ''
                var proofOfAdddressOfBusiness = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename

                if (req.files['proofOfAdddressOfBusiness'])
                    proofOfAdddressOfBusiness = req.files['proofOfAdddressOfBusiness'][0].filename




                const user_id = req.body.user_id
                const clientId = req.body.clientId
                const phone = req.body.phone
                const signed = req.body.signed
                const scanned = req.body.scanned
                const deposit = req.body.deposit
                const emailOfBusiness = req.body.emailOfBusiness
                const clientName = req.body.clientName


                const query = "INSERT INTO snpf_registeration(phone,\
                    formJ,\
                    formC,\
                    signed,\
                    scanned,\
                    deposit,\
                    powerOfAttorny,\
                    tradingLicense,\
                    applicationForm,\
                    emailOfBusiness,\
                    applicationLetter,\
                    proofOfAdddressOfBusiness,\
                    clientName,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [phone,
                    formJ,
                    formC,
                    signed,
                    scanned,
                    deposit,
                    powerOfAttorny,
                    tradingLicense,
                    applicationForm,
                    emailOfBusiness,
                    applicationLetter,
                    proofOfAdddressOfBusiness,
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



    app.put("/updateSNPFRegisterationDataById", upload.fields(
        [
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'powerOfAttorny' },
            { name: 'tradingLicense' },
            { name: 'applicationForm' },
            { name: 'applicationLetter' },
            { name: 'proofOfAdddressOfBusiness' },
        ]),
        (req, res) => {
            try {
                var formJ = ''
                var formC = ''
                var powerOfAttorny = ''
                var tradingLicense = ''
                var applicationForm = ''
                var applicationLetter = ''
                var proofOfAdddressOfBusiness = ''
                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename
                else
                    formJ = req.body.formJ

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename
                else
                    formC = req.body.formC

                if (req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny

                if (req.files['tradingLicense'])
                    tradingLicense = req.files['tradingLicense'][0].filename
                else
                    tradingLicense = req.body.tradingLicense

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename
                else
                    applicationForm = req.body.applicationForm

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename
                else
                    applicationLetter = req.body.applicationLetter

                if (req.files['proofOfAdddressOfBusiness'])
                    proofOfAdddressOfBusiness = req.files['proofOfAdddressOfBusiness'][0].filename
                else
                    proofOfAdddressOfBusiness = req.body.proofOfAdddressOfBusiness




                const clientId = req.body.clientId
                const phone = req.body.phone
                const signed = req.body.signed
                const scanned = req.body.scanned
                const deposit = req.body.deposit
                const emailOfBusiness = req.body.emailOfBusiness
                const clientName = req.body.clientName
                const app_id = req.body.app_id


                const query = "UPDATE snpf_registeration SET phone=?,\
                    formJ=?,\
                    formC=?,\
                    signed=?,\
                    scanned=?,\
                    deposit=?,\
                    powerOfAttorny=?,\
                    tradingLicense=?,\
                    applicationForm=?,\
                    emailOfBusiness=?,\
                    applicationLetter=?,\
                    proofOfAdddressOfBusiness=?,\
                    clientName=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [phone,
                    formJ,
                    formC,
                    signed,
                    scanned,
                    deposit,
                    powerOfAttorny,
                    tradingLicense,
                    applicationForm,
                    emailOfBusiness,
                    applicationLetter,
                    proofOfAdddressOfBusiness,
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
    app.get("/getSNPFRegisterationData",
        (req, res) => {
            try {
                db1.query("SELECT snpf_registeration.* , users.username FROM `snpf_registeration` LEFT JOIN users on users.user_id = snpf_registeration.created_by ORDER BY app_id DESC ",
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
    app.get("/getSNPFRegisterationById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  snpf_registeration WHERE app_id = ?", [appId],
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


    app.delete("/deleteSNPFRegisterationById/:appId",
        (req, res) => {
            try {
                var appId = req.params.appId
                db1.query("SELECT * FROM snpf_registeration WHERE app_id=?", [appId], (err, result) => {
                    if (err) {
                        console.log("db error ->", err)
                        res.status(202).send("Error in deleting data in database")
                    }
                    else {
                        try {
                            
                            deleteFiles(unlinkAsync, result)
                            console.log("deleye")
                            db1.query("DELETE FROM snpf_registeration WHERE app_id = ?", [appId], (err, result) => {
                                if (err) {
                                    console.log("db error ->", err)
                                    res.status(202).send("Error in deleting data in database")
                                }
                                else {
                                    res.status(200).send("Record deleted successfully")
                                }
                            })
                        } catch (e) {
                            console.log("error",e.errorMessage)
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
    app.post("/submitSNPFRegisterationData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _snpf_registeration_status(app_id,submitted) VALUES (?,?);", [appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE snpf_registeration SET submitted = 1 WHERE app_id = ?", [appId], (err, result) => {
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


