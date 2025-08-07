const express = require('express');
const { fetchMyChats } = require('../Controller/messagesController');
const router = express.Router();

router.get('/myChats', fetchMyChats)

module.exports = router;