import mongoose from 'mongoose';
const Schema = mongoose.Schema;

//Description the Parameters for creation of Schema
const contactSchema = new Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    number: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'is invalid'], // must be existing @ and . in email address
        index: true
    }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
