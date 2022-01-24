const db1 = require("../db");

const insertData = (insertquery,arr, res)=>{
    var msg = "'nothing'"
    db1.query(insertquery,arr,
    (err,result)=>{
    if(err)
    {
        // console.log("db error ->", err)
        msg = "Error in inserting data iin database"
        res.status(202).send("Error in inserting data in database")
    }
    else
    {
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
      ||    key === 'dependantVisa'
      ||    key === 'passportCopy'
      ||    key === 'guardianPermit'
      ||    key === 'applicationForm'
      ||    key === 'powerOfEAttorny'
      ||    key === 'relationShipProof'
      ||    key === 'applicationLetter'
      ||    key === 'marriageCertificate'
)
            if(item[key]!== '')
                {
                    let dest =  `./public/${item[key]}`
                    await unlinkAsync(dest)
                }
    })
}
module.exports = function(app, upload,unlinkAsync){
    app.post("/insertDependantNewApplication",upload.fields(
        [
            {name:'photo'},
            {name:'dependantVisa'},
            {name:'passportCopy'},
            {name:'guardianPermit'},
            {name:'applicationForm'},
            {name:'powerOfAttorny'},
            {name:'relationShipProof'},
            {name:'applicationLetter'},
            {name:'marriageCertificate'},
        ]),
        (req, res) =>{
            try{
                var photo = ''
                var dependantVisa = ''
                var passportCopy = ''
                var guardianPermit = ''
                var applicationForm = ''
                var powerOfEAttorny = ''
                var relationShipProof = ''
                var applicationLetter = ''
                var marriageCertificate = ''
                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                    if(req.files['photo'])
                        photo = req.files['photo'][0].filename

                    if(req.files['dependantVisa'])
                        dependantVisa = req.files['dependantVisa'][0].filename

                    if(req.files['passportCopy'])
                        passportCopy = req.files['passportCopy'][0].filename

                    if(req.files['guardianPermit'])
                        guardianPermit = req.files['guardianPermit'][0].filename

                    if(req.files['applicationForm'])
                        applicationForm = req.files['applicationForm'][0].filename

                    if(req.files['powerOfEAttorny'])
                        powerOfEAttorny = req.files['powerOfEAttorny'][0].filename

                    if(req.files['relationShipProof'])
                        relationShipProof = req.files['relationShipProof'][0].filename

                    if(req.files['applicationLetter'])
                        applicationLetter = req.files['applicationLetter'][0].filename

                    if(req.files['marriageCertificate'])
                        marriageCertificate = req.files['marriageCertificate'][0].filename




                const  user_id = req.body.user_id
                const clientId = req.body.clientId               
                const  certified = req.body.certified
                const  applicationFee = req.body.applicationFee
                const  clientName = req.body.clientName


                const query = "INSERT INTO dependant_new_application(photo,\
                    certified,\
                    dependantVisa,\
                    passportCopy,\
                    applicationFee,\
                    guardianPermit,\
                    applicationForm,\
                    clientName,\
                    powerOfEAttorny,\
                    relationShipProof,\
                    applicationLetter,\
                    marriageCertificate,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [photo,
                    certified,
                    dependantVisa,
                    passportCopy,
                    applicationFee,
                    guardianPermit,
                    applicationForm,
                    clientName,
                    powerOfAttorny,
                    relationShipProof,
                    applicationLetter,
                    marriageCertificate,
                    clientId,
                    user_id]
                const msg = insertData(query,array, res)
            }
            catch(e){
                console.log("exeption: ->",e.message)
                res.status(202).send("Exception occured during database query")
            }
    })
    
    app.put("/updateDependantNewApplicationDataById", upload.fields(
        [
        {name:'photo'},
        {name:'dependantVisa'},
        {name:'passportCopy'},
        {name:'guardianPermit'},
        {name:'applicationForm'},
        {name:'powerOfEAttorny'},
        {name:'relationShipProof'},
        {name:'applicationLetter'},
        {name:'marriageCertificate'},
    ]),
    (req, res) =>{
        try{
            var photo = ''
            var dependantVisa = ''
            var passportCopy = ''
            var guardianPermit = ''
            var applicationForm = ''
            var powerOfEAttorny = ''
            var relationShipProof = ''
            var applicationLetter = ''
            var marriageCertificate = ''
                if(req.files['photo'])
                    photo = req.files['photo'][0].filename
                else
                    photo = req.body.photo

                if(req.files['dependantVisa'])
                    dependantVisa = req.files['dependantVisa'][0].filename
                else
                    dependantVisa = req.body.dependantVisa

                if(req.files['passportCopy'])
                    passportCopy = req.files['passportCopy'][0].filename
                else
                    passportCopy = req.body.passportCopy

                if(req.files['guardianPermit'])
                    guardianPermit = req.files['guardianPermit'][0].filename
                else
                    guardianPermit = req.body.guardianPermit

                if(req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename
                else
                    applicationForm = req.body.applicationForm

                if(req.files['powerOfEAttorny'])
                    powerOfEAttorny = req.files['powerOfEAttorny'][0].filename
                else
                    powerOfEAttorny = req.body.powerOfEAttorny

                if(req.files['relationShipProof'])
                    relationShipProof = req.files['relationShipProof'][0].filename
                else
                    relationShipProof = req.body.relationShipProof

                if(req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename
                else
                    applicationLetter = req.body.applicationLetter

                if(req.files['marriageCertificate'])
                    marriageCertificate = req.files['marriageCertificate'][0].filename
                else
                    marriageCertificate = req.body.marriageCertificate




            const  user_id = req.body.user_id
            const  clientId = req.body.clientId
            const  certified = req.body.certified
            const  applicationFee = req.body.applicationFee
            const  clientName = req.body.clientName
            const app_id = req.body.app_id


            const query = "UPDATE dependant_new_application SET photo=?,\
                certified=?,\
                dependantVisa=?,\
                passportCopy=?,\
                applicationFee=?,\
                guardianPermit=?,\
                applicationForm=?,\
                clientName=?,\
                powerOfEAttorny=?,\
                relationShipProof=?,\
                applicationLetter=?,\
                marriageCertificate=?,\
                clientId=?\
                WHERE app_id = ?"

            const array = [photo,
                certified,
                dependantVisa,
                passportCopy,
                applicationFee,
                guardianPermit,
                applicationForm,
                clientName,
                powerOfEAttorny,
                relationShipProof,
                applicationLetter,
                marriageCertificate,
                clientId,
                app_id]

            const msg = updateData(query,array, res)
        }
        catch(e){
            console.log("exeption: ->",e.message)
            res.status(202).send("Exception occured during file handling")
        }
})

app.delete("/deleteDependantNewApplicationDataById/:appId",
(req, res) => {
    try {
        console.log("hy")
        var appId = req.params.appId
        db1.query("SELECT * FROM dependant_new_application WHERE app_id=?",[appId],(err,result)=>{
            if(err)
            {
                console.log("db error ->", err)
                res.status(202).send("Error in deleting data in database")
            }
            else{
                try{
                    deleteFiles(unlinkAsync, result)
                    db1.query("DELETE FROM dependant_new_application WHERE app_id = ?",[appId],(err,result)=>
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
app.get("/getDependantNewApplicationData", 
(req, res) => {
    try {
        db1.query("SELECT dependant_new_application.* , users.username FROM `dependant_new_application` LEFT JOIN users on users.user_id = dependant_new_application.created_by ORDER BY app_id DESC ",
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

app.get("/getDependantNewApplicationById/:appId", 
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  dependant_new_application WHERE app_id = ?",[appId],
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
        //submit
app.post("/submitDependantNewApplicationData", 
(req, res) => {
    try {
        const appId = req.body.appId
        const startDate = req.body.startDate

        console.log(appId)
        db1.query("INSERT INTO _dependant_new_application_status(app_id,submitted) VALUES (?,?);",[appId, startDate],
            (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(202).send("Error in inserting data in database. Please Try again")
                }
                else { 
                    console.log("result")
                    db1.query("UPDATE dependant_new_application SET submitted = 1 WHERE app_id = ?", [appId], (err, result) =>{
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



