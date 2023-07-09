import {Server, Socket} from "socket.io";
import * as console from "console";
import {createServer} from "http";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
let sockets: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>[] = []
const server = createServer();

const io = new Server(server)

io.on('connection', (socket) => {
  sockets.push(socket)
  socket.on('oui', (string: string) => {
    console.log(string)
  })

  socket.on('disconnect', () => {
    sockets = sockets.filter((element) => {
      return element.id !== socket.id
    })
  })
})


export {io, server, sockets}

