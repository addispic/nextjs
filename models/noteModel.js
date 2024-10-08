import mongoose, {Schema} from "mongoose";

// notes schema
const noteSchema = new Schema({
    text: {
        type: String,
    },
},{
    timestamps: true,
})

export default mongoose.models.Note || mongoose.model("Note",noteSchema)