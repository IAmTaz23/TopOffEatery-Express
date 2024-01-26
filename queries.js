const { response } = require("express")
const Pool = require('pg').Pool
const tokenManager = require('./token-manager.js')
require('dotenv').config()


const pool = new Pool({
    user: 'bbarnett12',
    host: 'localhost',
    database: 'topoffeatery',
    password: 'password',
    port: 5432
})


async function createUser(req, res) {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send('User added')
    })
}

async function getUser(req, res) {
    const userId = req.params.id

    await pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if(error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}

async function deleteUser(req, res) {
    const userId = req.user
    
    await pool.query('DELETE FROM users WHERE id = $1', [userId], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`User ID: ${userId} was deleted.`)
    })
}

async function updateUser(req, res) {
    const userId = req.user
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username

    await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4' , [username, email, password, userId], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).send(`User ID:${userId} was updated`)
    })
}


async function events(req, res) {

    await pool.query('SELECT * FROM events',  (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results)
    })
}
async function cuisineType(req, res) {
    await pool.query('SELECT * FROM cuisine',  (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results)
    })
}
async function menu(req, res) {
    let cuisineId = req.body.cuisineId 
    await pool.query('SELECT * FROM menu WHERE cuisine_id = $1', [cuisineId], (error, results) => {
        if(error) {
            throw error
        }
        res.status(200).json(results)
    })
}
// async function orderSubmit(req, res) {
//     await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4' , [username, email, password, userId], (error, results) => {
//         if(error) {
//             throw error
//         }
//         res.status(200).send(`User ID:${userId} was updated`)
//     })
// }
// async function orderConfirm(req, res) {
//     await pool.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4' , [username, email, password, userId], (error, results) => {
//         if(error) {
//             throw error
//         }
//         res.status(200).send(`User ID:${userId} was updated`)
//     })
// }


async function login(req, res) {
    const email = req.body.email
    const password = req.body.password

    await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            throw error
        }
        //do loging stuff with our JWTc
        console.log(results.rows)
        const token = tokenManager.generateAccessToken(results.rows[0].id)
        res.status(200).json(token)
    })
}

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser,
    events,
    cuisineType,
    menu,
    // orderSubmit,
    // orderConfirm
    login
}