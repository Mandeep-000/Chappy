const express = require('express')
const router = express.Router()

const {
    people,
    profile, 
    getMessages
} = require('../controllers/chatController')

router.route('/profile').get(profile)
router.route('/people').get(people)
router.route('/messages/:userId').get(getMessages)

module.exports = router