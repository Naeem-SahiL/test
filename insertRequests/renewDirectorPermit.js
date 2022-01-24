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
    var i = 0
    var item = data[0]
    var count = Object.keys(item).length;

    Object.keys(item).forEach(async function(key){
        if(
       key === 'photo'
      ||    key === 'formJ'
      ||    key === 'formC'
      ||    key === 'bankStatement'
      ||    key === 'passportCopy'
      ||    key === 'originalPermit'
      ||    key === 'powerOfAttorny'
      ||    key === 'applicationLetter'
      ||    key === 'tradingLicenceCopy'
      ||    key === 'SNPFComplianceCertificate'
      ||    key === 'companyMemorandumcertified'
        )
            if(item[key]!== '')
                {
                    let dest =  `./public/${item[key]}`
                    await unlinkAsync(dest)
                }
    })
}

module.exports = function(app, upload, unlinkAsync){
    app.post("/insertRenewalDirecterPermit",upload.fields(
        [
            {name:'photo'},
            {name:'formJ'},
            {name:'formC'},
            {name:'bankStatement'},
            {name:'passsportCopy'},
            {name:'originalPermit'},
            {name:'powerOfAttorny'},
            {name:'applicationLetter'},
            {name:'tradingLicenceCopy'},
            {name:'SNPFComplianceCertificate'},
            {name:'companyMemorandumcertified'},
        ]),
        (req, res) =>{
            try{
                var photo = ''
                var formJ = ''
                var formC = ''
                var bankStatement = ''
                var passsportCopy = ''
                var originalPermit = ''
                var applicationLetter = ''
                var tradingLicenceCopy = ''
                var SNPFComplianceCertificate = ''
                var companyMemorandumcertified = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                    if(req.files['photo'])
                        photo = req.files['photo'][0].filename

                    if(req.files['formJ'])
                        formJ = req.files['formJ'][0].filename

                    if(req.files['formC'])
                        formC = req.files['formC'][0].filename

                    if(req.files['bankStatement'])
                        bankStatement = req.files['bankStatement'][0].filename

                    if(req.files['passsportCopy'])
                        passsportCopy = req.files['passsportCopy'][0].filename

                    if(req.files['originalPermit'])
                        originalPermit = req.files['originalPermit'][0].filename

                    if(req.files['applicationLetter'])
                        applicationLetter = req.files['applicationLetter'][0].filename

                    if(req.files['tradingLicenceCopy'])
                        tradingLicenceCopy = req.files['tradingLicenceCopy'][0].filename

                    if(req.files['SNPFComplianceCertificate'])
                        SNPFComplianceCertificate = req.files['SNPFComplianceCertificate'][0].filename

                    if(req.files['companyMemorandumcertified'])
                        companyMemorandumcertified = req.files['companyMemorandumcertified'][0].filename




                const  user_id = req.body.user_id
                const clientId = req.body.clientId                
                const  deposit = req.body.deposit
                const  clientName = req.body.clientName
                const  companyName = req.body.companyName
                const  applicationFee = req.body.applicationFee


                const query = "INSERT INTO renewal_director_permit(photo,\
                    formJ,\
                    formC,\
                    deposit,\
                    clientName,\
                    companyName,\
                    bankStatement,\
                    passportCopy,\
                    originalPermit,\
                    powerOfAttorny,\
                    applicationFee,\
                    applicationLetter,\
                    tradingLicenceCopy,\
                    SNPFComplianceCertificate,\
                    companyMemorandumcertified,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [photo,
                    formJ,
                    formC,
                    deposit,
                    clientName,
                    companyName,
                    bankStatement,
                    passsportCopy,
                    originalPermit,
                    powerOfAttorny,
                    applicationFee,
                    applicationLetter,
                    tradingLicenceCopy,
                    SNPFComplianceCertificate,
                    companyMemorandumcertified,
                    clientId,
                    user_id]
                const msg = insertData(query,array, res)
            }
            catch(e){
                console.log("exeption: ->",e.message)
                res.status(202).send("Exception occured during database query")
            }
    })



        app.put("/updateRenewalDirecterPermitDataById", upload.fields(
            [
            {name:'photo'},
            {name:'formJ'},
            {name:'formC'},
            {name:'bankStatement'},
            {name:'passportCopy'},
            {name:'originalPermit'},
            {name:'powerOfAttorny'},
            {name:'applicationLetter'},
            {name:'tradingLicenceCopy'},
            {name:'SNPFComplianceCertificate'},
            {name:'companyMemorandumcertified'},
        ]),
        (req, res) =>{
            try{
                var photo = ''
                var formJ = ''
                var formC = ''
                var bankStatement = ''
                var passsportCopy = ''
                var originalPermit = ''
                var powerOfAttorny = ''
                var applicationLetter = ''
                var tradingLicenceCopy = ''
                var SNPFComplianceCertificate = ''
                var companyMemorandumcertified = ''
                    if(req.files['photo'])
                        photo = req.files['photo'][0].filename
                    else
                        photo = req.body.photo

                    if(req.files['formJ'])
                        formJ = req.files['formJ'][0].filename
                    else
                        formJ = req.body.formJ

                    if(req.files['formC'])
                        formC = req.files['formC'][0].filename
                    else
                        formC = req.body.formC

                    if(req.files['bankStatement'])
                        bankStatement = req.files['bankStatement'][0].filename
                    else
                        bankStatement = req.body.bankStatement

                    if(req.files['passsportCopy'])
                        passsportCopy = req.files['passsportCopy'][0].filename
                    else
                        passsportCopy = req.body.passsportCopy

                    if(req.files['originalPermit'])
                        originalPermit = req.files['originalPermit'][0].filename
                    else
                        originalPermit = req.body.originalPermit

                    if(req.files['powerOfAttorny'])
                        powerOfAttorny = req.files['powerOfAttorny'][0].filename
                    else
                        powerOfAttorny = req.body.powerOfAttorny

                    if(req.files['applicationLetter'])
                        applicationLetter = req.files['applicationLetter'][0].filename
                    else
                        applicationLetter = req.body.applicationLetter

                    if(req.files['tradingLicenceCopy'])
                        tradingLicenceCopy = req.files['tradingLicenceCopy'][0].filename
                    else
                        tradingLicenceCopy = req.body.tradingLicenceCopy

                    if(req.files['SNPFComplianceCertificate'])
                        SNPFComplianceCertificate = req.files['SNPFComplianceCertificate'][0].filename
                    else
                        SNPFComplianceCertificate = req.body.SNPFComplianceCertificate

                    if(req.files['companyMemorandumcertified'])
                        companyMemorandumcertified = req.files['companyMemorandumcertified'][0].filename
                    else
                        companyMemorandumcertified = req.body.companyMemorandumcertified




                const  clientId = req.body.clientId
                const  deposit = req.body.deposit
                const  clientName = req.body.clientName
                const  companyName = req.body.companyName
                const  applicationFee = req.body.applicationFee
                const app_id = req.body.app_id


                const query = "UPDATE renewal_director_permit SET photo=?,\
                    formJ=?,\
                    formC=?,\
                    deposit=?,\
                    clientName=?,\
                    companyName=?,\
                    bankStatement=?,\
                    passportCopy=?,\
                    originalPermit=?,\
                    powerOfAttorny=?,\
                    applicationFee=?,\
                    applicationLetter=?,\
                    tradingLicenceCopy=?,\
                    SNPFComplianceCertificate=?,\
                    companyMemorandumcertified=?,\
                    clientId=?\
                    WHERE app_id = ?"

                const array = [photo,
                    formJ,
                    formC,
                    deposit,
                    clientName,
                    companyName,
                    bankStatement,
                    passsportCopy,
                    originalPermit,
                    powerOfAttorny,
                    applicationFee,
                    applicationLetter,
                    tradingLicenceCopy,
                    SNPFComplianceCertificate,
                    companyMemorandumcertified,
                    clientId,
                    app_id]

                const msg = updateData(query,array, res)
            }
            catch(e){
                console.log("exeption: ->",e.message)
                res.status(202).send("Exception occured during file handling")
            }
    })



//get all route
app.get("/getRenewalDirecterPermitData",
(req, res) => {
    try {
        db1.query("SELECT renewal_director_permit.* , users.username FROM `renewal_director_permit` LEFT JOIN users on users.user_id = renewal_director_permit.created_by ORDER BY app_id DESC ",
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
app.get("/getRenewalDirecterPermitById/:appId",
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  renewal_director_permit WHERE app_id = ?",[appId],
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


        app.delete("/deleteRenewalDirecterPermitById/:appId",
            (req, res) => {
                try {
                    var appId = req.params.appId
                    db1.query("SELECT * FROM renewal_director_permit WHERE app_id=?",[appId],(err,result)=>{
                        if(err)
                        {
                            console.log("db error ->", err)
                            res.status(202).send("Error in deleting data in database")
                        }
                        else{
                            try{
                                deleteFiles(unlinkAsync, result)
                                db1.query("DELETE FROM renewal_director_permit WHERE app_id = ?",[appId],(err,result)=>
                                {
                                    if (err) {
                                        console.log("db error ->", err)
                                        res.status(202).send("Error in deleting data in database")
                                    }
                                    else {
                                        res.status(200).send("Record deleted successfully")
                                    }
                                })
                            }catch(e)
                            {
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
app.post("/submitRenewalDirecterPermitData",
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate
                console.log(appId)
                db1.query("INSERT INTO _renewal_director_permit_status(app_id,submitted) VALUES (?,?);",[appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else {
                            console.log("result")
                            db1.query("UPDATE renewal_director_permit SET submitted = 1 WHERE app_id = ?", [appId], (err, result) =>{
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


