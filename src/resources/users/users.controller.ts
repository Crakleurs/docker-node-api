import { Router } from 'express'
import {UsersService} from "~/resources/users/users.service";
import {BadRequestException, NotFoundException} from "~/utils/exception";

const UsersController = Router()

const service = new UsersService()


UsersController.get('/', (req, res) => {
  return res
    .status(200)
    .json(service.findAll())
})

UsersController.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID non valide')
  }

  const pet = service.findOne(id)

  if (!pet) {
    throw new NotFoundException('Animal introuvable')
  }

  return res
    .status(200)
    .json(pet)
})

export { UsersController }
