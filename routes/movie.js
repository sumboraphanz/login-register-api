const express = require("express")
const auth = require("../middleware/auth")
const router = require('express').Router()

router.get('/api/movie',auth,(req,res)=>{
    res.status(200).json(req.user)
})

module.exports = router
