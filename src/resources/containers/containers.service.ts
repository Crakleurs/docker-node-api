import Docker from 'dockerode'
export class ContainersService {
  async findAll() {
    const docker = new Docker();
    return await docker.listContainers({'all': true});
  }

  async count() {
    const docker = new Docker();
    const containers = await docker.listContainers();
    return containers.length;
  }

  async countRunning() {
    const docker = new Docker();
    const containers = await docker.listContainers({filters: '{"status": "running"}' });
    return containers.length;
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
}
