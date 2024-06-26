import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database.js'
dotenv.config()
import paymentRoutes from './paymentRoutes.js'
import { allowCors } from './cors.js'
import queryParser from 'express-query-int'


connectDB()


const port = process.env.PORT || 3003

const server = express()



//body parser middleware
server.use(express.urlencoded({ extended: true}))
server.use(express.json())
server.use(queryParser())
server.use(allowCors)

server.listen(port, () => {
    console.log(`Backend está rodando na porta ${port}`)
})

server.use('/api', paymentRoutes)


export default server