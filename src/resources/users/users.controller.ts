import {Router} from 'express'
import {UsersService} from "~/resources/users/users.service";
import {BadRequestException, NotFoundException} from "~/utils/exception";
import {AdminHandler} from "~/middlewares/jwt.handler";

const UsersController = Router()

const service = new UsersService()


UsersController.get('/',async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.findAll())

  } catch (e) {
    next(e);
  }
})

UsersController.get('/count',async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.count())
  } catch (e) {
    next(e);
  }
})

UsersController.get('/count-admins',async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.countAdmins())
  } catch (e) {
    next(e);
  }
})


UsersController.get('/count-users',async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.countUsers())
  } catch (e) {
    next(e);
  }
})

UsersController.get('/count-readers',async (req, res, next) => {

  try {

    return res
      .status(200)
      .json(await service.countReaders())
  } catch (e) {
    next(e);
  }
})

UsersController.get('/:id',(req, res, next) => {
  try {

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

  } catch (e) {
    next(e)
  }
})

UsersController.post('/', AdminHandler, async (req, res, next) => {
  try {
    const password = req.body.password;
    const username = req.body.username;
    const role = req.body.role;

    if (!password || !username || !role || !["ADMIN", "USER", "READER"].includes(role))
      throw new BadRequestException("BODY IS INCORRECT");

    return res
      .status(201)
      .json(await service.create(username, password, role))

  } catch (e) {
    next(e)
  }
})


UsersController.put('/password', async (req, res, next) => {
  try {
    const password = req.body.password;

    if (!password)
      throw new BadRequestException("PASSWORD IS INCORRECT");

    return res
      .status(200)
      .json(await service.changePassword(res.locals.user.id, password))

  } catch (e) {
    next(e)
  }
})

UsersController.delete('/:id', AdminHandler, async (req, res, next) => {
  try {
    const id = req.params.id;

    return res
      .status(204)
      .json(await service.delete(+id))
  } catch (e) {
    next(e)
  }
})

export {UsersController}
