"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var fs_1 = __importDefault(require("fs"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
require("dotenv").config();
var App = /** @class */ (function () {
    function App() {
        this.PORT = process.env.PORT || 8000;
        this.express = (0, express_1.default)();
        this.connectDB();
        this.middleware();
        this.routes();
        this.listen();
    }
    App.prototype.middleware = function () {
        this.express.use((0, cors_1.default)());
        this.express.use(express_1.default.json());
        this.express.use((0, express_fileupload_1.default)({
            useTempFiles: true,
        }));
        this.express.use(function (req, res, next) {
            var _a;
            console.table([
                {
                    METHOD: req.method,
                    PATH: req.path,
                    BODY: JSON.stringify(req === null || req === void 0 ? void 0 : req.body),
                    ip: req.ip,
                    AGENT: (_a = req === null || req === void 0 ? void 0 : req.get("user-agent")) === null || _a === void 0 ? void 0 : _a.split("/")[0],
                },
            ]);
            next();
        });
    };
    //   DB connection
    App.prototype.connectDB = function () {
        mongoose_1.default
            .connect(String(process.env.MONGODB_URI), {})
            .then(function () {
            console.log(">>>>>>>>>>>>> DATABASE IS CONNECTED <<<<<<<<<<<<<<<<");
        })
            .catch(function (err) {
            console.log("DB ERROR:", err.message);
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        //read files from routes folder
        var allFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, "/routes"));
        // import all files from routes folder
        allFiles.forEach(function (file, index) {
            // load all routes
            if (file.includes(".route.")) {
                Promise.resolve().then(function () { return __importStar(require(path_1.default.join(__dirname + "/routes/" + file))); }).then(function (route) {
                    _this.express.use("/api", new route.default().router);
                });
            }
            // not found route
            if (allFiles.length - 1 === index) {
                Promise.resolve().then(function () { return __importStar(require(path_1.default.join(__dirname + "/middleware/errorHandler.middleware"))); }).then(function (errorHandler) {
                    new errorHandler.default(_this.express);
                });
            }
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.express.listen(this.PORT, function () {
            console.log(">>>>>>>>>>>>>> Listening at port ".concat(_this.PORT, " <<<<<<<<<<<<<<"));
        });
    };
    return App;
}());
exports.default = new App();
