import { Schema, model } from 'mongoose';
import timestamps  from 'mongoose-timestamp';

const subjectsSchema = new Schema({
    SubjectName: {
        type: String,
        required: true
    },
    SubjectCode: {
        type: String,
        required: true
    },
    FacultyId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Faculties',
        required: true
    },
})

subjectsSchema.plugin(timestamps);

export default model('Subjects', subjectsSchema)