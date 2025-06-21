import { io } from "socket.io-client";

// export const socket = io();
export const socketFunction = (id) => {
  console.log("running");
  const initSocket = io(`${import.meta.env.BE_URL}`, {
    query: { id },
  });

  initSocket.io.on("close", () => {
    console.log("close");
  });

  initSocket.io.on("open", () => {
    console.log("open");
  });

  return initSocket;
};
