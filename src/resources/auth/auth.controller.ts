import {Router} from 'express'
import {BadRequestException} from "~/utils/exception";
import {AuthService} from "~/resources/auth/auth.service";

const AuthController = Router()

const service = new AuthService()


AuthController.post('/', async (req, res, next) => {

  try {
    if (!req.body.username || !req.body.password)
      throw new BadRequestException("PASSWORD OR USERNAME IS MISSING");

    const token = await service.auth(req.body.username, req.body.password)

    return res
      .status(200)
      .json({token});

  } catch (e) {
    next(e)
  }
})


export {AuthController}
