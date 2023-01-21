import Docker from 'dockerode'
import {sockets} from "~/utils/sockets";
import {asyncEmit} from "~/utils/async-emit";
export class ImagesService {
  async findAll() {

    const result: Docker.ImageInfo[] = [];

    for (const socket of sockets) {
      try {
        const images = await asyncEmit<Docker.ImageInfo[]>(socket, "images-all");
        result.push(...images);
      } catch (e) {
        console.log(e)
      }
    }

    return result;
  }

  async count() {
    let result = 0;
    for (const socket of sockets) {
      try {
        const {count} = await asyncEmit<{ count: number }>(socket, "images-count");
        result += count;
      } catch (e) {
        console.log(e)
      }
    }

    return {"count": result};
  }

  async remove(id: string) {
    for (const socket of sockets) {
      try {
        const images = await asyncEmit<Docker.ImageInfo[]>(socket, "images-all");
        for (const image of images) {
          if (image.Id === id) {
            return await asyncEmit(socket,"images-remove", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async prune() {
    for (const socket of sockets) {
      try {
        await asyncEmit<Docker.ImageInfo[]>(socket, "images-prune");
      } catch (e) {
        console.log(e)
      }
    }
  }

  async totalSize() {
    let result = 0;
    for (const socket of sockets) {
      try {
        const {size} = await asyncEmit<{ size: number }>(socket, "images-count");
        result += size;
      } catch (e) {
        console.log(e)
      }
    }

    return {"size": result};
  }

}
