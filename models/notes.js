import mongoose, {Schema} from "mongoose";

// notes schema
const notesSchema = new Schema({
    text: {
        type: String,
    }
},{
    timestamps: true,
})

// exports
export default mongoose.models.Note || mongoose.model("Note",notesSchema)