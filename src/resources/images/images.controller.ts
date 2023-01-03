import { Router } from 'express'
import {NotFoundException} from "~/utils/exception";
import {ImagesService} from "~/resources/images/images.service";

const ImagesController = Router()

const service = new ImagesService()

ImagesController.get('/', async (req, res) => {
  return res
    .status(200)
    .json(await service.findAll())
})

ImagesController.get('/:id', async (req, res) => {
  const container = await service.findOne(req.params.id)

  if (!container) {
    throw new NotFoundException('Container Not Found')
  }

  return res
    .status(200)
    .json(container)
})

ImagesController.delete('/prune', async (req, res) => {
  await service.prune()
  return res.status(204)
})


export { ImagesController }
