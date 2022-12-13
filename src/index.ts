import cors from 'cors'
import express from 'express'
import { config } from '~/config'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'
import {UsersController} from "~/resources/users/users.controller";


const app = express()


app.use(express.json())

app.use(cors())


app.use('/users', UsersController)

app.get('/', (req, res) => res.send('API DOCKER-android'))

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)


app.use(ExceptionsHandler)


app.listen(config.API_PORT, () => console.log("Server running on port " + config.API_PORT))
