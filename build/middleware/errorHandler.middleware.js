"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var ErrorHandlerMiddleware = /** @class */ (function () {
    function ErrorHandlerMiddleware(expressApp) {
        expressApp.use(function (req, res, next) { return next(new http_errors_1.default.NotFound()); });
        expressApp.use(this.errorHandler);
    }
    ErrorHandlerMiddleware.prototype.errorHandler = function (err, req, res, next) {
        var _a, _b;
        res.status(err.status || 500);
        var errorMessage = err.errors
            ? Object.entries(err.errors)
                .map(function (error) { return error[1].message; })
                .join()
            : ((_a = err.message) === null || _a === void 0 ? void 0 : _a.includes("duplicate"))
                ? "".concat(Object.entries(err.keyValue)[0][0]
                    .toString()
                    .split(/(?=[A-Z])/)
                    .join(" ")
                    .split(".")
                    .join(" ")
                    .replace(/^\w/, function (c) { return c.toUpperCase(); }), " is already exist!")
                : (err === null || err === void 0 ? void 0 : err.message) || ((_b = err === null || err === void 0 ? void 0 : err.error) === null || _b === void 0 ? void 0 : _b.description) || "Something went wrong";
        // console.log({ err });
        res.json({
            error: errorMessage,
            status: err.status || 500,
        });
    };
    return ErrorHandlerMiddleware;
}());
exports.default = ErrorHandlerMiddleware;
