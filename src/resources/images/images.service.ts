import Docker from 'dockerode'
export class ImagesService {
  async findAll() {
    const docker = new Docker();
    return await docker.listImages();
  }

  async count() {
    const docker = new Docker();
    const images = await docker.listImages();
    return images.length;
  }

  async findOne(id: string) {
    const docker = new Docker();
    return docker.getImage(id);
  }

  async remove(id: string) {
    const docker = new Docker();
    const image = docker.getImage(id);
    await image.remove()
  }

  async prune() {
    const docker = new Docker();
    return await docker.pruneImages();
  }

}
