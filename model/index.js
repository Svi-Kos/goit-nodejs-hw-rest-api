// const fs = require('fs/promises')
// // const contacts = require('./contacts.json')
// const { resolve } = require('path')
// const { v4: uuid } = require('uuid')
// const contactsPath = resolve('./contacts.json')

// async function parsedContacts() {
//     try {
//         const data = await fs.readFile(contactsPath, 'utf8')
//         return JSON.parse(data)
//     } catch (error) {
//         return console.error(error.message)
//     }
// }

// const listContacts = async () => {
//     try {
//         const contactList = await parsedContacts()
//         return contactList
//     } catch (err) {
//         return console.error(err.message)
//     }
// }

// const getContactById = async (contactId) => {
//     try {
//         const contactList = await parsedContacts()
//         const contactById = contactList.find(({ id }) => id === contactId)
//         console.table(contactById)

//         return contactById
//     } catch (err) {
//         return console.error(err.message)
//     }
// }

// const removeContact = async (contactId) => {
//     try {
//         const contactList = await parsedContacts()
//         const contactsAfterDeleting = contactList.filter(
//             ({ id }) => id !== contactId
//         )
//         if (contactList.length === contactsAfterDeleting.length) {
//             return console.log(
//                 `Id ${contactId} was deleted previously, try anoder Id`
//             )
//         }

//         await fs.writeFile(
//             contactsPath,
//             JSON.stringify(contactsAfterDeleting, null, 2),
//             'utf8'
//         )
//         console.table(contactsAfterDeleting)

//         return contactsAfterDeleting
//     } catch (err) {
//         return console.error(err.message)
//     }
// }

// const addContact = async (body) => {
//     try {
//         const contactList = await parsedContacts()
//         const id = uuid()
//         const newContact = {
//             id,
//             name: body.name,
//             email: body.email,
//             phone: body.phone,
//         }
//         const contactsWithNewID = [...contactList, newContact]
//         await fs.writeFile(
//             contactsPath,
//             JSON.stringify(contactsWithNewID, null, 2),
//             'utf8'
//         )
//         console.table(contactsWithNewID)
//         return contactsWithNewID
//     } catch (err) {
//         return console.error(err.message)
//     }
// }

// const updateContact = async (contactId, body) => {
//     // try {
//     //     const contactList = await parsedContacts()
//     //     const contactById = contactList.find(({ id }) => id === contactId)

//     //     console.table(contactById)

//     //     return contactById.contactId ? contactById : null
//     // } catch (err) {
//     //     return console.error(err.message)
//     // }
//     console.log('There will be updateContact function')
// }

// module.exports = {
//     listContacts,
//     getContactById,
//     removeContact,
//     addContact,
//     updateContact,
// }

const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const { v4: uuid } = require('uuid')
const { join } = require('path')
const contactsPath = join(__dirname, './contacts.json')

async function parsedContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return console.error(error.message)
    }
}

const listContacts = async () => {
    try {
        const contactList = await parsedContacts()
        return contactList
    } catch (err) {
        return console.error(err.message)
    }
    // return contacts
}

const getContactById = async (contactId) => {
    try {
        const contactList = await parsedContacts()
        const contactById = contactList.find(({ id }) => id === contactId)
        return contactById
    } catch (err) {
        return console.error(err.message)
    }
    // const contactById = contacts.find(({ id }) => id === contactId)
    // return contactById
}

const removeContact = async (contactId) => {
    try {
        const contactList = await parsedContacts()
        const contactsAfterDeleting = contactList.filter(
            ({ id }) => id !== contactId
        )
        if (contactList.length === contactsAfterDeleting.length) {
            return console.log(
                `Id ${contactId} was deleted previously, try anoder Id`
            )
        }

        await fs.writeFile(
            contactsPath,
            JSON.stringify(contactsAfterDeleting, null, 2),
            'utf8'
        )

        return contactsAfterDeleting
    } catch (err) {
        return console.error(err.message)
    }
    // const contactsAfterDeleting = contacts.filter(({ id }) => id !== contactId)
    // return contactsAfterDeleting
}

const addContact = async (body) => {
    try {
        const contactList = await parsedContacts()
        const id = uuid()
        const newContact = {
            id,
            name: body.name,
            email: body.email,
            phone: body.phone,
        }
        const contactsWithNewID = [...contactList, newContact]
        await fs.writeFile(
            contactsPath,
            JSON.stringify(contactsWithNewID, null, 2),
            'utf8'
        )
        return newContact
    } catch (err) {
        return console.error(err.message)
    }
    // const id = uuid()
    // const newContact = {
    //     id,
    //     name: body.name,
    //     email: body.email,
    //     phone: body.phone,
    // }
    // const contactsWithNewID = [...contacts, newContact]
    // await fs.writeFile(
    //     contactsPath,
    //     JSON.stringify(contactsWithNewID, null, 2),
    //     'utf8'
    // )
    // return contactsWithNewID
}

const updateContact = async (contactId, body) => {
    try {
        const contactList = await parsedContacts()
        const newContactList = contactList.filter(({ id }) => id !== contactId)
        const updatedContact = {
            id: contactId,
            name: body.name,
            email: body.email,
            phone: body.phone,
        }
        const contactsAfterUpdating = [...newContactList, updatedContact]
        await fs.writeFile(
            contactsPath,
            JSON.stringify(contactsAfterUpdating, null, 2),
            'utf8'
        )
        return updatedContact
    } catch (err) {
        return console.error(err.message)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
}
