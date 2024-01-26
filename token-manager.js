require('dotenv').config()
const jwt = require('jsonwebtoken')

const TOKEN_SECRET = "cb58117f61a884507729a8675e4699d312d39f7507aff5da0e24d3cdb3cdb2a7d48c72afbc2aebdd1b53659105eb6bdef38f407cc5b438be04a6960ff3a774d5"


function generateAccessToken(userId) {
    return  jwt.sign(userId, TOKEN_SECRET, {})
}

function authenicateToken(req, res, next) {
    const token = req.get('Authorization')

    if (token === null) {
        return res.sendStatus(401)
    } 
    
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if(error) {
            return res.sendStatus(405)
        }

        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenicateToken
}