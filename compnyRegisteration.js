const db1 = require("./db");
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
    console.log("here")
    var i = 0
    var item = data[0]
    var count = Object.keys(item).length;
    
    Object.keys(item).forEach(async function(key){
        if(
            key === 'pasportId' || 
            key === 'powerOfAttorny'
        )
            if(item[key]!== '')
                {
                    let dest =  `./public/${item[key]}`
                    await unlinkAsync(dest)
                }
    })
    console.log("Files Deleted!")
}

module.exports = function(app, upload,unlinkAsync){

    app.post("/insertCompanyRegisteration",upload.fields(
        [
            {name:'pasportId'},
            {name:'powerOfAttorny'},
        ]),
        (req, res) =>{
            try{
                var pasportId = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                    if(req.files['pasportId'])
                        pasportId = req.files['pasportId'][0].filename
                const  user_id = req.body.user_id
                const clientId = req.body.clientId                
                const  fee = req.body.fee
                const  phone = req.body.phone
                const  deposit = req.body.deposit
                const  poBoxNo = req.body.poBoxNo
                const  address = req.body.address
                const  clientName = req.body.clientName
                const  companyName = req.body.companyName


                const query = "INSERT INTO new_compony_registeration(fee,\
                    phone,\
                    deposit,\
                    poBoxNo,\
                    address,\
                    pasportId,\
                    clientName,\
                    companyName,\
                    powerOfAttorny,\
                    clientId,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [fee,
                    phone,
                    deposit,
                    poBoxNo,
                    address,
                    pasportId,
                    clientName,
                    companyName,
                    powerOfAttorny,
                    clientId,
                    user_id]
                const msg = insertData(query,array, res)
            }
            catch(e){
                console.log("exeption: ->",e.message)
                res.status(202).send("Exception occured during database query")
            }
    })
    //other routes..
    app.put("/updateCompanyRegisterationDataById", upload.fields(
        [
        {name:'pasportId'},
        {name:'powerOfAttorny'},
    ]),
    (req, res) =>{
        try{
            var pasportId = ''
            var powerOfAttorny = ''
                if(req.files['pasportId'])
                    pasportId = req.files['pasportId'][0].filename
                else
                    pasportId = req.body.pasportId

                if(req.files['powerOfAttorny'])
                    powerOfAttorny = req.files['powerOfAttorny'][0].filename
                else
                    powerOfAttorny = req.body.powerOfAttorny




            const  user_id = req.body.user_id
            const  fee = req.body.fee
            const  phone = req.body.phone
            const  deposit = req.body.deposit
            const  poBoxNo = req.body.poBoxNo
            const  address = req.body.address
            const clientId = req.body.clientId
            const  clientName = req.body.clientName
            const  companyName = req.body.companyName
            const app_id = req.body.app_id


            const query = "UPDATE new_compony_registeration SET fee=?,\
                phone=?,\
                deposit=?,\
                poBoxNo=?,\
                address=?,\
                pasportId=?,\
                clientName=?,\
                companyName=?,\
                powerOfAttorny=?,\
                clientId=?\
                WHERE app_id = ?"

            const array = [fee,
                phone,
                deposit,
                poBoxNo,
                address,
                pasportId,
                clientName,
                companyName,
                powerOfAttorny,
                clientId,
                app_id]

            const msg = updateData(query,array, res)
        }
        catch(e){
            console.log("exeption: ->",e.message)
            res.status(202).send("Exception occured during file handling")
        }
})
app.get("/getCompanyRegisterationData", 
(req, res) => {
    try {
        db1.query("SELECT new_compony_registeration.* , users.username FROM `new_compony_registeration` LEFT JOIN users on users.user_id = new_compony_registeration.created_by ORDER BY app_id DESC ",
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

app.get("/getCompanyRegisterationDataById/:appId", 
        (req, res) => {
            const appId = req.params.appId
            console.log(appId)
            try {
                db1.query("SELECT * FROM  new_compony_registeration WHERE app_id = ?",[appId],
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
app.delete("/deleteCompanyRegisterationDataById/:appId",
    (req, res) => {
        try {
            var appId = req.params.appId
            

            db1.query("SELECT * FROM new_compony_registeration WHERE app_id=?",[appId],(err,result)=>{
                
                if(err)
                {
                    console.log("db error ->", err)
                    res.status(202).send("Error in deleting data in database")
                }
                else{
                    
                    try{
                        deleteFiles(unlinkAsync, result)
                        
                        db1.query("DELETE FROM new_compony_registeration WHERE app_id = ?",[appId],(err,result)=>
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
app.post("/submitCompanyRegisterationData", 
        (req, res) => {
            try {
                const appId = req.body.appId
                const startDate = req.body.startDate

                console.log(appId)
                db1.query("INSERT INTO _new_compony_registeration_status(app_id,sumbited) VALUES (?,?);",[appId, startDate],
                    (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(202).send("Error in inserting data in database. Please Try again")
                        }
                        else { 
                            console.log("result")
                            db1.query("UPDATE new_compony_registeration SET submitted = 1 WHERE app_id = ?", [appId], (err, result) =>{
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







