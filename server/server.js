import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import locationRouter from './routes/locations.js'
import eventRouter from './routes/events.js'
import cors from 'cors'


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'party.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'party.png')))
    app.use(express.static('public'))
}

// app.use('/api', router)

app.use('/api/locations', locationRouter)
app.use('/api/events', eventRouter)

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Baruch AIS Events API</h1>')
})


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})