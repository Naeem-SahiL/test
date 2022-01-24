const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const db = require("./db");
const multer = require("multer")
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage })



module.exports = function (app) {
    // Route to get user
    app.get("/get/:username/:password/:role", (req, res) => {
        const user = req.params.username
        const password = req.params.password
        const role = req.params.role

        try {
            db.query("SELECT * FROM users WHERE username = ? AND password = ? AND role = ?", [user, password, role], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(404).send("not found")
                }
                if (result.length < 1) {
                    res.send("not found")
                }

                else {
                    res.send(result)
                    console.log(user)
                    db.query("UPDATE users SET status = ? WHERE users.username = ?", [1, user], (err, result) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            console.log("success updated status")
                        }
                    })

                    console.log("sucess logged")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    // Route to get all user
    app.get("/getUsers", (req, res) => {

        try {
            db.query("SELECT * FROM users", (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(202).send("ERROR OCURED IN DATABASE. Try again")
                }
                else if (result.length < 1) {
                    res.status(202).send("No users found")
                }
                else {
                    res.status(200).send(result)
                    console.log("sucess fetch users")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    // Route to get all user
    app.get("/getUserById/:userId", (req, res) => {

        try {
            const userId = req.params.userId
            db.query("SELECT users.username FROM `users` WHERE user_id = ?", [userId], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(202).send("Database Error Occured. Please try again with true info")
                }
                else if (result.length < 1) {
                    res.status(202).send("not found")
                }
                else {
                    res.status(200).send(result)
                    console.log("user found")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    
    app.get("/getUserDataById/:userId", (req, res) => {

        try {
            const userId = req.params.userId
            db.query("SELECT * FROM `users` WHERE user_id = ?", [userId], (err, result) => {
                if (err) {
                    console.log(err)
                    res.status(202).send("Database Error Occured. Please try again with true info")
                }
                else if (result.length < 1) {
                    res.status(202).send("not found")
                }
                else {
                    res.status(200).send(result)
                    console.log("user found")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    // Route to get all user
    app.put("/logoutstatus/:username", (req, res) => {
        const user = req.params.username

        try {
            db.query("UPDATE users SET status = ? WHERE users.username = ?", [0, user], (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.send("logout")
                    console.log("success updated status")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    // Route to delete
    
    app.delete("/deleteClient/:clientId", (req, res) => {
        const clientId = req.params.clientId

        try {
            db.query("DELETE FROM clients WHERE clients.clientId = ?", [clientId], (err, result) => {
                if (err) {
                    console.log(err)
                    req.send("error")
                    return
                }
                else {
                    res.send("deleted")
                    console.log("success delete")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    app.post("/insertUser", (req, res) => {
        const fullName = req.body.fullName
        const username = req.body.username
        const address = req.body.address
        const email = req.body.email
        const role = req.body.role
        const phone = req.body.phone
        const password = req.body.password

        try {
            db.query("INSERT INTO users(username, fullname, role, password, phone, email, status, address) VALUES (?,?,?,?,?,?,?,?)", [username, fullName, role, password, phone, email, 0, address], (err, result) => {
                if (err) {
                    console.log(err)
                    req.send("error")
                    return
                }
                else {
                    res.send("inserted")
                    console.log("success insert")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });

    app.put("/updateUser", (req, res) => {
        const userId = req.body.userId
        const fullname = req.body.fullName
        const username = req.body.username
        const address = req.body.address
        const email = req.body.email
        const role = req.body.role
        const phone = req.body.phone
        const password = req.body.password

        try {

            const query2 = "UPDATE users SET \
                username=?,\
                fullname=?,\
                role=?,\
                password=?,\
                phone=?,\
                email=?,\
                address=?\
                WHERE user_id = ?"

            const array = [username,
                fullname,
                role,
                password,
                phone,
                email,
                address,
                userId]

                db.query(query2, array,
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
        catch (e) {
            console.log(e.message)
        }

    });
    app.put("/updateUser", (req, res) => {
        const userId = req.body.userId
        const fullname = req.body.fullName
        const username = req.body.username
        const address = req.body.address
        const email = req.body.email
        const role = req.body.role
        const phone = req.body.phone
        const password = req.body.password

        try {

            const query2 = "UPDATE users SET \
                username=?,\
                fullname=?,\
                role=?,\
                password=?,\
                phone=?,\
                email=?,\
                address=?\
                WHERE user_id = ?"

            const array = [username,
                fullname,
                role,
                password,
                phone,
                email,
                address,
                userId]

                db.query(query2, array,
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
        catch (e) {
            console.log(e.message)
        }

    });
    app.delete("/deleteUser/:userId", (req, res) => {
        const userId = req.params.userId

        try {
            db.query("DELETE FROM users WHERE users.user_id = ?", [userId], (err, result) => {
                if (err) {
                    console.log(err)
                    req.send("error")
                    return
                }
                else {
                    res.send("deleted")
                    console.log("success delete")
                }
            })
        }
        catch (e) {
            console.log(e.message)
        }

    });
    app.get('/getAllJobDetails/:procName',function(req,res){
        try{
            var procName = req.params.procName 
            console.log(procName)
    
            db.query("CALL "+procName+"();", (err, result) => {
                if(err)
                {
                    console.log(err)
                    res.status(401).send("error")
                    return
                }
                else{
                    res.status(200).send(result)
                    console.log("success fetch")
                }
            })
        }catch(e)
        {
            console.log("exeption->", e)
        }
        
    })
    app.get('/getJobDetails/:procName',function(req,res){
        try{
            var procName = req.params.procName 
            // console.log(procName)
    
            db.query("CALL "+procName+"(@all, @sub, @rem);", (err, result) => {
                if(err)
                {
                    console.log(err)
                    res.status(401).send("error")
                    return
                }
                else{
                    res.status(200).send(result)
                    // console.log("success fetch")
                }
            })
        }catch(e)
        {
            console.log("exeption->", e)
        }
        
    })
    app.get('/filterJobs/:tbName/:filterBy',function(req,res){
        try{
            var filterBy = req.params.filterBy 
            var tbName = req.params.tbName
    
            if (filterBy === 'sub')
            {
                db.query("SELECT "+tbName+".*,users.username FROM "+tbName+" LEFT JOIN users on users.user_id = "+tbName+".created_by WHERE "+tbName+".submitted = 1 ORDER BY app_id DESC", (err, result) => {
                    if(err)
                    {
                        console.log(err)
                        res.status(401).send("error")
                        return
                    }
                    else{
                        console.log(result)
                        res.status(200).send(result)
                        console.log("success filter")
                    }
                })
            } 
            else{
                // 'SELECT company_renewal.*,users.username FROM `company_renewal` LEFT JOIN users on users.user_id = company_renewal.created_by ORDER BY app_id DESC'
                db.query("SELECT "+tbName+".*,users.username FROM "+tbName+" LEFT JOIN users on users.user_id = "+tbName+".created_by WHERE "+tbName+".submitted = 0 ORDER BY app_id DESC", (err, result) => {
                    if(err)
                    {
                        console.log(err)
                        res.status(401).send("error")
                        return
                    }
                    else{
                        console.log(result)
                        res.status(200).send(result)
                        console.log("success filter")
                    }
                })
            }
           
        }catch(e)
        {
            console.log("exeption->", e)
        }
        
    })
    app.get('/viewFile/:fileName',function(req,res){
        try{
            var fileName = req.params.fileName
            
            let filepath =__dirname+  `/public/${fileName}`
            console.log(filepath)
            fs.readFile(filepath, (err, content)=>{
            if(err){
                res.writeHead(404, {"Content-type": "text/html"})
                res.end("<h1>not ahm found</h1>")
            }else{
                res.writeHead(200)
                res.end(content)
            }
            })
        }catch(e)
        {
            console.log("exeption->", e)
        }
        
    })


    
    // Route to insert compony_registeration
    require('./compnyRegisteration')(app, upload,unlinkAsync);
    require('./insertRequests/depandantNewApplication')(app, upload,unlinkAsync); 
    require('./insertRequests/dependantRenewalApplication')(app, upload,unlinkAsync); 
    require('./insertRequests/directorPermitAdditional')(app, upload,unlinkAsync); 
    require('./insertRequests/etaxRegisteration')(app, upload, unlinkAsync); 
    require('./insertRequests/existingBusinessPermit')(app, upload, unlinkAsync); 
    require('./insertRequests/newTradingLicense')(app, upload, unlinkAsync); 
    require('./insertRequests/renewDirectorPermit')(app, upload, unlinkAsync); 
    require('./insertRequests/renewalTradingLicense')(app, upload, unlinkAsync); 
    require('./insertRequests/snpfRegisteration')(app, upload, unlinkAsync); 
    require('./insertRequests/specialPass')(app, upload, unlinkAsync); 
    require('./insertRequests/stampVisaVisti')(app, upload, unlinkAsync); 
    require('./insertRequests/tinPersonalRegistration')(app, upload, unlinkAsync); 
    require('./insertRequests/tinCompanyReg')(app, upload, unlinkAsync); 
    require('./insertRequests/companyTinRegisteration')(app, upload, unlinkAsync); 
    require('./insertRequests/visitorPass')(app, upload, unlinkAsync); 
    require('./insertRequests/companyRenewal')(app, upload, unlinkAsync); 
    require('./getRequests/getCompanyRegisterationData')(app); 
    require('./getRequests/getCompanyRenewalJobs')(app); 
    require('./globalRequests/manageClients')(app); 
    require('./globalRequests/getUserRole')(app); 
    require('./globalRequests/getStatusOfApplication')(app,fs); 
}