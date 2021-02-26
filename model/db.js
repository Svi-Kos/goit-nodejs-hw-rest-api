const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
    console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
    console.log(`Database connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
    console.log('Database is disconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('connection for db is closed and app is terminated')
    process.exit(1)
})

module.exports = db