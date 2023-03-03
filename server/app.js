//ESTE ARCHIVO SOLO TIENE LA CONFIGURACIÓN DE EXPRESS
import express from 'express'

//import {createRoles} from './libs/initialSetup.js' Funcion que crea los roles
import fileUpload from 'express-fileupload'

import godsRoutes from './routes/gods.routes.js'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/user.routes.js'
import {dirname, join} from 'path'
import {fileURLToPath} from 'url'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))
//createRoles();

app.use(express.urlencoded({extended:false}))//encripta la url al hacer una petición
//Middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

//Routes
app.use('/api', godsRoutes) //Puede usarse sin el '/api'
app.use('/api/auth', authRoutes)
app.use('/api/users',usersRoutes)

app.use(express.static(join(__dirname, '../client/build')))

export default app