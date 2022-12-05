"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldValidateError = void 0;
var express_validator_1 = require("express-validator");
var http_errors_1 = require("http-errors");
var fieldValidateError = function (req) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new http_errors_1.BadRequest(errors
            .array()
            .map(function (errors) { return errors.msg; })
            .join()
            .replace(/[,]/g, " and "));
    }
};
exports.fieldValidateError = fieldValidateError;
