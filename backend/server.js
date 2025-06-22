import app from "./app";
import { createServer } from "http";

const PORT = 5000;
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`server listing PORT No. ${PORT}`);
});
