import mongoose from "mongoose";

const db = async () => {
    if(mongoose.connections[0].readyState) {
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected')
    }catch(err){
        console.log(err)
        process.exit(-1)
    }
}

export default db;