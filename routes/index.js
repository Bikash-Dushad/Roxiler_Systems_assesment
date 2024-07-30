const express = require('express')
const router = express.Router();
const transactioncontroller = require('../controller/transactionController')

router.get('/initialize', transactioncontroller.initialize);
router.get('/allTransaction', transactioncontroller.allTransaction)
router.get('/searchByTitle', transactioncontroller.searchByTitle)
router.get('/test', transactioncontroller.test)

module.exports = router;