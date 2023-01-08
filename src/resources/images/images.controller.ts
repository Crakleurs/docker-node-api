import { Router } from 'express'
import {NotFoundException} from "~/utils/exception";
import {ImagesService} from "~/resources/images/images.service";
import {UserHandler} from "~/middlewares/jwt.handler";

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

ImagesController.get('/:id', UserHandler, async (req, res, next) => {

  try {

    const container = await service.findOne(req.params.id)

    if (!container) {
      throw new NotFoundException('Container Not Found')
    }

    return res
      .status(200)
      .json(container)

  } catch (e) {
    next(e)
  }

})

ImagesController.delete('/prune', UserHandler, async (req, res, next) => {

  try {

    await service.prune()
    return res.status(204)

  } catch (e) {
    next(e)
  }

})

ImagesController.delete('/:id', UserHandler, async (req, res, next) => {

  try {

    await service.remove(req.params.id)
    return res.status(204)

  } catch (e) {
    next(e)
  }
})

export { ImagesController }
