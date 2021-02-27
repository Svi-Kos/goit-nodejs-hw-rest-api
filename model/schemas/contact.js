const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Set contact name'],
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Set contact email'],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, 'Set contact phone number'],
            unique: true,
        },
        subscription: {
            type: Array,
            set: (data) => (!data ? [] : data),
        },
        // password: {
        //     password: String,
        //     token: String,
        // },
    },
    { versionKey: false, timestamps: true }
)

contactSchema.virtual('id').get(function () {
    return this._id
})

const Contact = model('contact', contactSchema)

module.exports = Contact
