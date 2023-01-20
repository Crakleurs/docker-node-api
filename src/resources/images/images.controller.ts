import { Router } from 'express'
import {ImagesService} from "~/resources/images/images.service";
import {UserHandler} from "~/middlewares/jwt.handler";
import * as console from "console";

const ImagesController = Router()

const service = new ImagesService()

ImagesController.get('/', async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.findAll())

  } catch (e) {
    next(e)
  }

})

ImagesController.get('/count', async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.count())

  } catch (e) {
    next(e)
  }

})


ImagesController.get('/size', async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.totalSize())

  } catch (e) {
    next(e)
  }

})

ImagesController.delete('/prune', UserHandler, async (req, res, next) => {

  try {

    await service.prune()
    return res.status(200).json(await service.findAll())

  } catch (e) {
    console.log(e)
    next(e)
  }

})

ImagesController.delete('/:id', UserHandler, async (req, res, next) => {

  try {

    await service.remove(req.params.id)
    return res.status(200).json(await service.findAll());

  } catch (e) {
    next(e)
  }
})

export { ImagesController }
