import {Router} from 'express'
import {NotFoundException} from "~/utils/exception";
import {ContainersService} from "~/resources/containers/containers.service";
import {UserHandler} from "~/middlewares/jwt.handler";

const ContainersController = Router()

const service = new ContainersService()


ContainersController.get('/', async (req, res, next) => {
  try {

    return res
      .status(200)
      .json(await service.findAll())

  } catch (e) {
    next(e)
  }
})

ContainersController.get('/:id', async (req, res, next) => {

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

ContainersController.post('/:id/stop', UserHandler, async (req, res, next) => {

  try {

    await service.stop(req.params.id)
    return res.status(201)

  } catch (e) {
    next(e)
  }
})

ContainersController.delete('/:id', UserHandler, async (req, res, next) => {

  try {

    await service.remove(req.params.id)
    return res.status(204)

  } catch (e) {
    next(e)
  }
})

ContainersController.post('/:id/restart', UserHandler, async (req, res, next) => {

  try {

    await service.restart(req.params.id)
    return res.status(201)

  } catch (e) {
    next(e)
  }

})

ContainersController.post('/:id/start', UserHandler, async (req, res, next) => {

  try {

    await service.start(req.params.id)
    return res.status(201)

  } catch (e) {
    next(e)
  }

})

export {ContainersController}
