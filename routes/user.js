const express = require("express")
const router = require('express').Router()
const user = require("../controllers/user")

router.post('/api/signup',user.signup)
router.post('/api/login', user.login)

module.exports = router