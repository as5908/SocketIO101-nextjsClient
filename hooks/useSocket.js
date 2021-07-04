import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
// export default function useSocket(cb) {
//   const [activeSocket, setActiveSocket] = useState(null);

//   useEffect(() => {
//     // debug("Socket updated", { socket, activeSocket });
//     if (activeSocket || !socket) return;
//     cb && cb(socket);
//     setActiveSocket(socket);
//     return function cleanup() {
//       // debug("Running useSocket cleanup", { socket });
//       socket.off('message.chat1', cb);
//     };
//   }, [socket]);

//   return activeSocket;
// }

export default function useSocket(eventName, cb) {
  useEffect(() => {
    socket.on(eventName, cb);

    return function useSocketCleanup() {
      socket.off(eventName, cb);
    };
  }, [eventName, cb]);

  return socket;
}
