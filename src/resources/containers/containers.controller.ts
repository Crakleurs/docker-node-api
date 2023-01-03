import { Router } from 'express'
import {NotFoundException} from "~/utils/exception";
import {ContainersService} from "~/resources/containers/containers.service";

const ContainersController = Router()

const service = new ContainersService()


ContainersController.get('/', async (req, res) => {
  return res
    .status(200)
    .json(await service.findAll())
})

ContainersController.get('/:id', async (req, res) => {
  const container = await service.findOne(req.params.id)

  if (!container) {
    throw new NotFoundException('Container Not Found')
  }

  return res
    .status(200)
    .json(container)
})

ContainersController.post('/:id/stop', async (req, res) => {
  await service.stop(req.params.id)

  return res.status(201)
})

ContainersController.post('/:id/remove', async (req, res) => {
  await service.remove(req.params.id)

  return res.status(204)
})

ContainersController.post('/:id/restart', async (req, res) => {
  await service.restart(req.params.id)

  return res.status(201)
})

ContainersController.post('/:id/start', async (req, res) => {
  await service.start(req.params.id)

  return res.status(201)
})

export { ContainersController }
