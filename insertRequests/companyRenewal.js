const db1 = require("../db");

const insertData = (insertquery, arr, res) => {
    var msg = "'nothing'"
    db1.query(insertquery, arr,
        (err, result) => {
            if (err) {
                console.log("db error ->", err)
                res.status(202).send("Error in inserting data in database")
            }
            else {
                res.status(200).send("Record inserted successfully")
            }
        })
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
            key === 'formJ' || 
            key === 'prevFormC' || 
            key === 'powerOfAttorny'
        )
            if(item[key]!== '')
                {
                    let dest =  `./public/${item[key]}`
                    await unlinkAsync(dest)
                }
    })
}

module.exports = function (app, upload,unlinkAsync) {
    app.post("/insertRenewalApplication", upload.fields(
        [ 
            { name: 'formJ' },
            { name: 'prevFormC' },
            { name: 'powerOfAttorny' },
        ]),
        (req, res) => {
            console.log("trigred")
            try {
                var formJ = ''
                var prevFormC = '' 

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename

                if (req.files['prevFormC'])
                    prevFormC = req.files['prevFormC'][0].filename

                const user_id = req.body.user_id

                const clientId = req.body.clientId
                const clientName = req.body.clientName
                const companyName = req.body.companyName
                // console.log(clientName, companyName)

                const deposit = req.body.deposit
                const renewalFee = req.body.renewalFee

                const query = "INSERT INTO company_renewal(formJ,\
                    deposit,\
                    prevFormC,\
                    renewalFee,\
                    clientId,\
                    clientName,\
                    companyName,\
                    powerOfAttorny,\
                    created_by,\
                    created_on\
                    ) VALUES(?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [formJ,
                    deposit,
                    prevFormC,
                    renewalFee,
                    clientId,
                    clientName,
                    companyName,
                    powerOfAttorny,
                    user_id]
                const msg = insertData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })

        //update 
        app.put("/updateRenewalApplicationDataById", upload.fields(
            [
                { name: 'formJ' },
                { name: 'prevFormC' },
                { name: 'powerOfAttorny' },
            ]),
            (req, res) => {
                try {
                    var formJ = ''
                    var prevFormC = ''
                    var powerOfAttorny = ''
                    
                    if (req.files['powerOfAttorny'])
                        powerOfAttorny = req.files['formJ'][0].filename
                    else
                        powerOfAttorny = req.body.powerOfAttorny
                    if (req.files['formJ'])
                        {
                            console.log(req.files['formJ'][0].filename)
                            formJ = req.files['formJ'][0].filename
                        }
                    else
                        formJ = req.body.formJ
    
                    if (req.files['prevFormC'])
                        prevFormC = req.files['prevFormC'][0].filename
                    else
                        prevFormC = req.body.prevFormC
    
                    const app_id = req.body.app_id
                    const deposit = req.body.deposit
                    const renewalFee = req.body.renewalFee

                    const clientId = req.body.clientId
                    const clientName = req.body.clientName
                    const companyName = req.body.companyName
    
                    const query = "UPDATE company_renewal SET formJ=?,\
                        clientId=?,\
                        clientName=?,\
                        companyName=?,\
                        deposit=?,\
                        prevFormC=?,\
                        renewalFee=?,\
                        powerOfAttorny=?\
                        WHERE app_id = ?"

                    const array = [formJ,
                        clientId,
                        clientName,
                        companyName,
                        deposit,
                        prevFormC,
                        renewalFee,
                        powerOfAttorny,
                        app_id]
                    console.log(array)
                    const msg = updateData(query, array, res)
                }
                catch (e) {
                    console.log("exeption: ->", e.message)
                    res.status(202).send("Exception occured during file handling")
                }
            })
        //delete 
        app.delete("/deleteRenewalApplicationDataById/:appId",
            (req, res) => {
                try {
                    var appId = req.params.appId
                    db1.query("SELECT * FROM company_renewal WHERE app_id=?",[appId],(err,result)=>{
                        if(err)
                        {
                            console.log("db error ->", err)
                            res.status(202).send("Error in deleting data in database")
                        }
                        else{
                            try{
                                deleteFiles(unlinkAsync, result)
                                db1.query("DELETE FROM company_renewal WHERE app_id = ?",[appId],(err,result)=>
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
}

    




