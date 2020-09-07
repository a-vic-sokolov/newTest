const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const router = Router()


// /api/auth/register
router.post(
    '/currency',
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
                initialState: 488
            },
                {
                    initialValue: 0,
                    initialName: 'BNBMAINNET',
                    initialState: 1/488
                }
            ] )

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })