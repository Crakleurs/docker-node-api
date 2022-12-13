import {NotFoundException} from "~/utils/exception";


export const UnknownRoutesHandler = () => {
  throw new NotFoundException(`La resource demandée n'existe pas`)
}
