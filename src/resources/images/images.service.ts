import Docker from 'dockerode'
export class ImagesService {
  async findAll() {
    const docker = new Docker();
    return await docker.listImages();
  }

  async count() {
    const docker = new Docker();
    const images = await docker.listImages();
    return {"count": images.length};
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

  async totalSize() {
    const docker = new Docker();
    const images = await docker.listImages();

    const size = images.reduce((accumulator, currentValue) => accumulator + currentValue.Size, 0);
    return {size: size}
  }

}
