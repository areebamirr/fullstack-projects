import { Server } from "socket.io";

module.exports.connectToSocket = (server) => {
    const io = new Server(server);
    return io;
}
