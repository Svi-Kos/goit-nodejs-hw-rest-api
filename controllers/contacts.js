const Contacts = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { ...contacts },
    })
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(
      Number(req.params.contactId) || req.params.contactId,
      userId
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const create = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact({ ...req.body, owner: userId })
    if (contact) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { contact },
      })
    }
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id
    const deletedContact = await Contacts.removeContact(
      Number(req.params.contactId) || req.params.contactId,
      userId
    )
    if (deletedContact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        message: 'contact deleted',
        data: { deletedContact },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
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
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      Number(req.params.contactId) || req.params.contactId,
      req.body,
      userId
    )
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { contact },
      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
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
