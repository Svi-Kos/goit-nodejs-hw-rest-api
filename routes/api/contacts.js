const express = require('express')
const router = express.Router()
const Contacts = require('../../model/index')
const validate = require('./validation')

router.get('/', async (req, res, next) => {
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
})

router.get('/:contactId', async (req, res, next) => {
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
})

router.post('/', validate.createContact, async (req, res, next) => {
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
})

router.delete('/:contactId', async (req, res, next) => {
    try {
        const contactsAfterDeleting = await Contacts.removeContact(
            Number(req.params.contactId) || req.params.contactId
        )
        if (contactsAfterDeleting) {
            return res.json({
                status: 'success',
                code: 200,
                message: 'contact deleted',
                data: { contactsAfterDeleting },
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
})

router.patch('/:contactId', validate.updateContact, async (req, res, next) => {
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
})

module.exports = router
