import express from 'express'
import volumeRoutes from './routes/volumeRoutes.js'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', volumeRoutes)

export default app