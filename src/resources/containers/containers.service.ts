import Docker from 'dockerode'
import {sockets} from "~/utils/sockets";
import {asyncEmit} from "~/utils/async-emit";

export class ContainersService {
  async findAll() {

    const result: Docker.ContainerInfo[] = [];

    for (const socket of sockets) {
      try {
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        result.push(...containers);
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
        const {count} = await asyncEmit<{ count: number }>(socket, "containers-count");
        result += count;
      } catch (e) {
        console.log(e)
      }
    }

    return {"count": result};
  }

  async countRunning() {
    let result = 0;
    for (const socket of sockets) {
      try {
        const {count} = await asyncEmit<{ count: number }>(socket, "containers-count-running");
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
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        for (const container of containers) {
          if (container.Id === id) {
            return socket.emit("containers-delete", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async stop(id: string) {
    for (const socket of sockets) {
      try {
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        for (const container of containers) {
          if (container.Id === id) {
            return socket.emit("containers-stop", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async restart(id: string) {
    for (const socket of sockets) {
      try {
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        for (const container of containers) {
          if (container.Id === id) {
            return socket.emit("containers-restart", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }


  async start(id: string) {
    for (const socket of sockets) {
      try {
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        for (const container of containers) {
          if (container.Id === id) {
            return socket.emit("containers-start", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  async getContainerInfo(id: string) {
    for (const socket of sockets) {
      try {
        const containers = await asyncEmit<Docker.ContainerInfo[]>(socket, "containers-all");
        for (const container of containers) {
          if (container.Id === id) {
            return socket.emit("container", id);
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
