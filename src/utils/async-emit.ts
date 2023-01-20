import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {Socket} from "socket.io";

function asyncEmit<Type>(socket:  Socket<DefaultEventsMap, DefaultEventsMap>, eventName: string, ...args: any[]) : Promise<Type> {
  return new Promise(function (resolve, reject) {
    socket.emit(eventName, ...args);
    socket.once(eventName, (result) => {
      resolve(result);
    });
    setTimeout(reject, 10000);
  });
}

export {asyncEmit}
