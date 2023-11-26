const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static('public'));


const history = [
    {
        id: 1,
        description: "Пополнение карты",
        type: 'plus'
    },
    {
        id: 2,
        description: "Снятие средств",
        type: 'minus'
    },
    {
        id: 3,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maxime numquam nesciunt quis molestiae modi, tenetur aut assumenda sapiente unde ipsum, sint reprehenderit labore doloremque alias impedit saepe voluptatem vel.",
        type: 'minus'
    },
    {
        id: 4,
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maxime numquam nesciunt quis molestiae modi, tenetur aut assumenda sapiente unde ipsum, sint reprehenderit labore doloremque alias impedit saepe voluptatem vel.",
        type: 'plus'
    }
]

app.get('/api/money', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    // res.statusCode = 400;
    // res.send("Access token denied")

    res.send({
        rubles: "123.321",
        dollars: "32.32",
        euro: "0"
    })
})

app.post('/api/transfer', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    if (req.body.type === '₽') {
        res.json({
            rubles: "23.321",
            dollars: "32.32",
            euro: "0"
        })
    } else {
        res.statusCode = 400;
        res.json({
            rubles: "423.321",
            dollars: "432.32",
            euro: "0"
        })
    }
})

app.get('/api/rate', (req, res, next) => {
    res.send({
        dollarRate: "0.011",
        euroRate: "0.0108"
    })
})

app.put('/api/exchange', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    if (req.body.currencyFrom === '₽') {
        res.json({
            rubles: "23.321",
            dollars: "32.32",
            euro: "0"
        })
    } else {
        res.statusCode = 400;
        res.json({
            rubles: "423.321",
            dollars: "432.32",
            euro: "0"
        })
    }
})

app.get('/api/history', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    res.json({history: history})
})

app.get('/api/user', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    res.json({
        name: 'Карпов Павел Павлович',
        number: '5331431431'
    })
})

app.get('/api/suggestion', (req, res, next) => {
    if (req.headers.authorization === 'Bearer access1' || req.headers.authorization === 'Bearer null') {
        res.statusCode = 401;
        res.send("Access token denied")
    }

    res.json([
        {
            id: 1,
            img: 'http://localhost:3030/face.svg',
            title: 'title',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure inventore consequuntur error voluptatem nisi possimus quia sed ipsam distinctio, dolorum velit! Est hic, ratione tenetur tempora officiis obcaecati harum aliquid." 
        },
        {
            id: 2,
            title: 'title',
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure inventore consequuntur error voluptatem nisi possimus quia sed ipsam distinctio, dolorum velit! Est hic, ratione tenetur tempora officiis obcaecati harum aliquid.",
            link: {
                text: 'Яндекс',
                path: 'http://ya.ru'
            }
        }
    ])
    
})

app.post('/api/auth/login', (req, res, next) => {
    res.json({
        databaseSalt: "salt1",
        onceSalt: "salt2"
    })
})

app.post('/api/auth/password', (req, res, next) => {
    res.json({
        access: "access1",
        refresh: "refresh1"
    })
})

app.post('/api/auth/refresh', (req, res, next) => {
    res.json({
        access: "access2",
        refresh: "refresh2"
    })
})

// app.post('/api/auth/refresh', (req, res, next) => {
    
//     res.statusCode = 400;
//     res.send("Refresh already has been requested")
// })

const PORT = 3030;

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})