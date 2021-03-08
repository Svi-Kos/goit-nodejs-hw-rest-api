const express = require('express')
const router = express.Router()
const contactsControllers = require('../../../controllers/contacts')
const validate = require('./validation')
const guard = require('../../../helpers/guards')

router
  .get('/', guard, contactsControllers.getAll)
  .post('/', guard, validate.createContact, contactsControllers.create)

router
  .get('/:contactId', guard, contactsControllers.getById)
  .delete('/:contactId', guard, contactsControllers.remove)
  .patch(
    '/:contactId',
    guard,
    validate.updateContact,
    contactsControllers.update
  )

module.exports = router
