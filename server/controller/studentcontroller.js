const studentDB = require('../../models/studentdb');

// exports is in use, no need to run modlue.exports to export each functoin

exports.newStudent = (req,res)=>{
    if (!req.body){
        res.status(400).send({message:'Missing request body, pls check'})
        return;
    }

    let name = req.body.name;
    let age = Number(req.body.age);
    let gender = req.body.gender;

    //need to specify the model name with "new" and the attributes to be
    let newStudent = new studentDB(
        {
            name, 
            age, 
            gender
        }
        )
    
    newStudent.save().then((data)=>
    {
        res.json(`New student has been added with ID : ${data}`)
    }).catch((err)=>
    {
        res.status(500).send({message: err.message + `Failed to save the user ${name} ` ||" Some error occured while creating the user "})
    })

}

//Get all users
exports.showAll = (req,res)=>{
    studentDB.find()
    .then((data)=>{
        res.status(200).send({data})
    })
    .catch((err)=>{
        res.status(500).send({message: err.message + "  failed to fetch data from database"})
    })
}

//update user with PUT and ID param
exports.updateStudent = async (req,res)=>{

    if(!req.body){
        res.status(400).send({message: "Missing student update data"})
        return;
    }

    let studentID = req.params.id;
    let {name,age,gender} = req.body
    let newData = {name,age,gender}

    await studentDB.findByIdAndUpdate(studentID,newData,{useFindAndModify: false})
    .then((data)=>{
        res.status(200).send({message:`New data has been updated : ${data}`}) 
    })
    .catch((err)=>{
        res.status(400).send({message : err.message + `Failed to update to the DB`})
    })
}

//Delete by ID
exports.deleteStudent = async (req,res)=>{
    let studentid = req.query.id
    
    if(!studentid){
        res.status(400).send({message: "Delete ID not found, send as query"})
        return;
    }

    studentData = await studentDB.findById(studentid)
    .then((studata)=>{

        if(!studata){
            res.status(404).send({message:` Cannot find a Student with given ID : ${studentid}`})
            return;
        }

        studentDB.findByIdAndDelete(studentid)
            .then((data)=>{
                res.status(200).send({message:`Student data has been deleted with ID:${studentid} and name : ${studata}`})
            })
            .catch((err)=>{
                res.status(500).send({message: err.message + " >> failed to delete data from database"})
            })
            
        console.log(studata)
    })
    .catch((err)=>{
        console.log(err.message)
    })

}