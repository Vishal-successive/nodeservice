import Server from "./Server";
import envConfig from "./config/configuration";
const server = new Server(envConfig);
server.bootstrap();
server.run();
