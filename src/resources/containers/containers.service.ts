import Docker from 'dockerode'
export class ContainersService {
  async findAll() {
    const docker = new Docker();
    return await docker.listContainers({'all': true});
  }

  async count() {
    const docker = new Docker();
    const containers = await docker.listContainers({'all': true});
    return {"count": containers.length};
  }

  async countRunning() {
    const docker = new Docker();
    const containers = await docker.listContainers();
    return {"count": containers.length};
  }

  async findOne(id: string) {
    const docker = new Docker();
    return docker.getContainer(id);
  }

  async remove(id: string) {
    const docker = new Docker();
    const container = docker.getContainer(id);
    await container.remove()
  }

  async stop(id: string) {
    const docker = new Docker();
    const container = docker.getContainer(id);
    await container.stop()
  }

  async restart(id: string) {
    const docker = new Docker();
    const container = docker.getContainer(id);
    await container.restart()
  }


  async start(id: string) {
    const docker = new Docker();
    const container = docker.getContainer(id);
    await container.start()
  }

  async getContainerInfo(id: string) {
    const docker = new Docker();
    let containers = await docker.listContainers({'all': true});
    return  containers.find((container) => {
      return container.Id === id
    });
  }
}
