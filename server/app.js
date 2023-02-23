//ESTE ARCHIVO SOLO TIENE LA CONFIGURACIÓN DE EXPRESS
import express from 'express'
import godsRoutes from './routes/gods.routes.js'
import fileUpload from 'express-fileupload'

const app = express()

app.use(express.urlencoded({extended:false}))//encripta la url al hacer una petición
//Middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

//Routes
app.use(godsRoutes)

export default app