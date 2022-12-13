import UserModel from "~/resources/users/user.model";
import {UserOutput} from "~/resources/users/user.interface";
import {NotFoundException} from "~/utils/exception";

export class UsersService {
  async findAll(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }

  async findOne(id: number): Promise<UserModel> {
    const user = await UserModel.findByPk(id);
    if (!user)
      throw new NotFoundException("user with id " + id + " not found.")

    return user;
  }

  /**
   * Met à jour un animal en particulier
   *
   * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
   *
   * @param petData - Un objet correspondant à un animal, il ne contient pas forcément tout un animal. Attention, on ne prend pas l'id avec.
   * @param id - ID unique de l'animal
   */
  update(petData: Partial<Pet>, id: number): Pet | undefined {
    const index = this.pets.findIndex(pet => pet.id === id)

    if (index === -1) {
      throw new NotFoundException('Animal introuvable')
    }

    /* On ne met jamais l'id à jour */
    delete petData.id

    this.pets[index] = { ...this.pets[index], ...petData }
    return this.pets[index]
  }

  /**
   * Créé un animal
   *
   * /!\ Idéalement, il faudrait vérifier le contenu de la requête avant de le sauvegarder.
   *
   * @param petData - Un objet correspondant à un animal. Attention, on ne prend pas l'id avec.
   */
  create(petData: Omit<Pet, 'id'>): Pet {
    const newPet: Pet = {
      ...petData,
      /* /!\ Ne pas faire ceci dans un vrai projet */
      id: Math.floor(Math.random() * 100)
    }

    this.pets.push(newPet)
    return newPet
  }

  /**
   * Suppression d'un animal
   */
  delete(id: number) {
    this.pets = this.pets.filter(pet => pet.id !== id)
  }
}
