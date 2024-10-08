import mongoose from "mongoose";

// db connection
const dbConnection = async () => {
    if(mongoose.connections[0].readyState){
        return true
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected')
    }catch(err){
        console.log(err)
        process.exit(-1)
    }
}

// exports
export default dbConnection