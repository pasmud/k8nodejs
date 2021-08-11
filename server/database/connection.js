const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser : true,
            useUnifiedTopology:true,
            UseFindAndModify:false,
            useCreateIndex:true,
        })

        console.log(`MongiDB Connected:${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }

}

module.exports = connectDB;