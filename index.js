const express = require('express')
const path = require('path')
const app = express()
const {Router} = require('express')
const router = Router()
const http = require('http')
const blavla = require('./routes/data.routes')
const {check, validationResult} = require('express-validator')

app.use(express.json({extended: true}))
//app.use('/api/data', blavla)


app.use('/', express.static(path.join(__dirname, 'client', 'dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})
const PORT =  5000

function start() {
    try{
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    }
    catch (e) {

    }
}
app.post(
    '/api/data/currency',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        console.log(req.body)
        try {

            res.status(201).json([{
                initialValue: 0,
                initialName: 'BTC',
                initialVal: 478.842340
            },
                {
                    initialValue: 0,
                    initialName: 'BNBmainet',
                    initialVal: 1
                }
            ] )

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })
start();