const dotenv = require('dotenv').config()
const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const File = require('../models/File')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

router.post('/registration',
    [
        check('password', 'Не корректный пароль').isLength({min: 4})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Не корректные данные при регистрации"
                })
            }
            const {username, password} = req.body
            const isUsed = await User.findOne({username})

            if (isUsed) {
                return res.status(400).json({message: "Данный Username уже занят"})
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new User({
                username, password: hashPassword
            })

            await user.save()

            res.status(201).json({message: 'Пользователь создан'})

        } catch (error) {
            res.status(500).json({message: "my error"})
        }
    })

router.get('/list', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message: "My Error"})
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const {id} = req.params

        const files = await File.find({owner: id})
        if (files.length > 0) {
            return res.status(501).json({message: "Удалите связанные файлы"})
        }

        await File.deleteMany({owner: id})
        await User.deleteOne({_id: id})
        res.status(200).json({message: "user Deleted"})

    } catch (error) {
        res.status(500).json({message: "My Delete error!!!"})
    }
})

router.post('/login',
    [
        check('password', 'Некорректный пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Не корректные данные при авторизации'
                })
            }

            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: "The user does't exists"})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({message: "Passwords do not match"})
            }

            const jwtSecret = process.env.JWT
            const token = jwt.sign(
                {userId: user.id},
                jwtSecret,
                {expiresIn: '1h'}
            )

            return res.status(200).json({token, userID: user.id, username: user.username, message: "Very well"})

        } catch (error) {
            res.status(400).json({message: `My Error ${error}`})
        }
    })

module.exports = router