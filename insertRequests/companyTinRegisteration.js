const db1 = require("../db");

const insertData = (insertquery, arr, res) => {
    var msg = "'nothing'"
    db1.query(insertquery, arr,
        (err, result) => {
            if (err) {
                // console.log("db error ->", err)
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







module.exports = function (app, upload) {
    app.post("/insertTinCompanyRegisteration", upload.fields(
        [
            { name: 'formJ' },
            { name: 'formC' },
            { name: 'leaseAgrement' },
            { name: 'powerOfAttorny' },
            { name: 'applicationForm' },
            { name: 'applicationLetter' },
            { name: 'directorIDCardCopy' },
        ]),
        (req, res) => {
            try {
                var formJ = ''
                var formC = ''
                var leaseAgrement = ''
                var applicationForm = ''
                var applicationLetter = ''
                var directorIDCardCopy = ''

                const powerOfAttorny = req.files['powerOfAttorny'][0].filename
                if (req.files['formJ'])
                    formJ = req.files['formJ'][0].filename

                if (req.files['formC'])
                    formC = req.files['formC'][0].filename

                if (req.files['leaseAgrement'])
                    leaseAgrement = req.files['leaseAgrement'][0].filename

                if (req.files['applicationForm'])
                    applicationForm = req.files['applicationForm'][0].filename

                if (req.files['applicationLetter'])
                    applicationLetter = req.files['applicationLetter'][0].filename

                if (req.files['directorIDCardCopy'])
                    directorIDCardCopy = req.files['directorIDCardCopy'][0].filename




                const user_id = req.body.user_id
                const phone = req.body.phone
                const scanned = req.body.scanned
                const deposit = req.body.deposit
                const companyEmail = req.body.companyEmail
                const directorPTinNo = req.body.directorPTinNo


                const query = "INSERT INTO company_tin_registeration(phone,\
                    formJ,\
                    formC,\
                    scanned,\
                    deposit,\
                    companyEmail,\
                    leaseAgrement,\
                    directorPTinNo,\
                    powerOfAttorny,\
                    applicationForm,\
                    applicationLetter,\
                    directorIDCardCopy,\
                    created_by,\
                    created_on\
                    ) \nVALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,CURDATE())"
                const array = [phone,
                    formJ,
                    formC,
                    scanned,
                    deposit,
                    companyEmail,
                    leaseAgrement,
                    directorPTinNo,
                    powerOfAttorny,
                    applicationForm,
                    applicationLetter,
                    directorIDCardCopy,
                    user_id]
                const msg = insertData(query, array, res)
            }
            catch (e) {
                console.log("exeption: ->", e.message)
                res.status(202).send("Exception occured during database query")
            }
        })
}



