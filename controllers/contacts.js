const Contacts = require('../model/index')

const getAll = async (req, res, next) => {
    try {
        const contacts = await Contacts.listContacts()
        return res.json({
            status: 'success',
            code: 200,
            data: { contacts },
        })
    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const contact = await Contacts.getContactById(
            Number(req.params.contactId) || req.params.contactId
        )
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: { contact },
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found',
            })
        }
    } catch (e) {
        next(e)
    }
}

const create = async (req, res, next) => {
    try {
        const contact = await Contacts.addContact(req.body)
        if (contact) {
            return res.status(201).json({
                status: 'success',
                code: 201,
                data: { contact },
            })
        }
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const deletedContact = await Contacts.removeContact(
            Number(req.params.contactId) || req.params.contactId
        )
        if (deletedContact) {
            return res.json({
                status: 'success',
                code: 200,
                message: 'contact deleted',
                data: { deletedContact },
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                data: 'Not found',
            })
        }
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const contact = await Contacts.updateContact(
            Number(req.params.contactId) || req.params.contactId,
            req.body
        )
        if (contact) {
            return res.json({
                status: 'success',
                code: 200,
                data: { contact },
            })
        } else {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'Not found',
            })
        }
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove,
    update,
}
