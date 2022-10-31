import cors from "cors";
import express from "express";
import uploader from "express-fileupload";
import fs from "fs";
import mongoose from "mongoose";
import path from "path";
require("dotenv").config();

class App {
  public express: express.Application;
  private PORT = process.env.PORT || 8000;

  constructor() {
    this.express = express();
    this.connectDB();
    this.middleware();
    this.routes();
    this.listen();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(
      uploader({
        useTempFiles: true,
      })
    );
  }

  //   DB connection
  private connectDB(): void {
    mongoose
      .connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/tsmart",
        {}
      )
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
    this.express.listen(this.PORT, () => {
      console.log(
        `>>>>>>>>>>>>>> Listening at port ${this.PORT} <<<<<<<<<<<<<<`
      );
    });
  }
}
export default new App();
