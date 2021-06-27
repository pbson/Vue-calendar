import { Schema, model } from 'mongoose';
import timestamps  from 'mongoose-timestamp';
import Subjects from './Subjects'
import Users from './Users'

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
facultiesSchema.pre('remove', { document: true, query: false },async function(){
    await Subjects.updateMany({FacultyId: this._id}, {FacultyId: '60d363069aaf354c62b5d2ed' }, { multi: true });
    await Users.updateMany({FacultyId: this._id}, {FacultyId: '60d363069aaf354c62b5d2ed' }, { multi: true });
});
facultiesSchema.plugin(timestamps);
export default model('Faculties', facultiesSchema)