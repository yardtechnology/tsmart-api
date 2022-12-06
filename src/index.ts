import cors from "cors";
import express from "express";
import uploader from "express-fileupload";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import incomingBookingsRoute from "./socket/incomingBooking.socket";
import positionRoute from "./socket/position.socket";
import serviceRoute from "./socket/service.socket";
import http = require("http");
require("dotenv").config();

class App {
  public express: express.Application;
  private PORT = process.env.PORT || 8000;
  private server: any;
  private Io: any;
  // = require("socket.io")(server, {
  //   cors: {
  //     origin: "*",
  //     methods: ["GET", "POST"],
  //     allowedHeaders: ["my-custom-header"],
  //     credentials: true,
  //   },
  // });

  constructor() {
    this.express = express();
    this.server = http.createServer(this.express);
    this.Io = require("socket.io")(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    this.connectDB();
    this.middleware();
    this.routes();
    this.listen();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(uploader());
    this.express.use((req, res, next) => {
      console.table([
        {
          METHOD: req.method,
          PATH: req.path,
          BODY: JSON.stringify(req?.body),
          ip: req.ip,
          AGENT: req?.get("user-agent")?.split("/")[0],
        },
      ]);
      next();
    });
  }

  //   DB connection
  private connectDB(): void {
    mongoose
      .connect(String(process.env.MONGODB_URI), {})
      .then(() => {
        console.log(">>>>>>>>>>>>> DATABASE IS CONNECTED <<<<<<<<<<<<<<<<");
      })
      .catch((err) => {
        console.log("DB ERROR:", err.message);
      });
  }

  private routes(): void {
    //read files from routes folder
    const allFiles = fs.readdirSync(path.join(__dirname, "/routes"));
    // import all files from routes folder
    allFiles.forEach((file, index) => {
      // load all routes
      if (file.includes(".route.")) {
        import(path.join(__dirname + "/routes/" + file)).then((route) => {
          this.express.use("/api", new route.default().router);
        });
      }
      // not found route
      if (allFiles.length - 1 === index) {
        import(
          path.join(__dirname + "/middleware/errorHandler.middleware")
        ).then((errorHandler) => {
          new errorHandler.default(this.express);
        });
      }
    });
  }

  public listen(): void {
    this.server.listen(this.PORT, () => {
      this.Io.of("/incoming-job").on(
        "connection",
        incomingBookingsRoute(this.Io)
      );
      this.Io.of("/service").on("connection", serviceRoute(this.Io));
      this.Io.of("/position").on("connection", positionRoute(this.Io));
      console.log(
        `>>>>>>>>>>>>>> Listening at port ${this.PORT} <<<<<<<<<<<<<<`
      );
    });
  }
}
export default new App();
