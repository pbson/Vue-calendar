import { Schema, model } from 'mongoose';
import timestamps  from 'mongoose-timestamp';

const facultiesSchema = new Schema({
    FacultyName: {
        type: String,
        required: true
    },
    FacultyDescription: {
        type: String,
        required: true
    }
})

rolesSchema.plugin(timestamps);
export default model('Faculties', facultiesSchema)