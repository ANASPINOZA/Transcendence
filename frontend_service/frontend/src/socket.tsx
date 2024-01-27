import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_BACKEND_URL+"chat";
export const socket = io(URL, {
  withCredentials: true,
});
