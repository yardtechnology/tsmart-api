"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (Io) { return function (socket) {
    socket.on("ENTER-POSITION-CHANGE-ROOM", function (payload) {
        var _a;
        console.log("ENTERED-POSITION-CHANGE-ROOM", payload);
        socket.join("POSITION-CHANGE-ROOM-".concat((_a = payload === null || payload === void 0 ? void 0 : payload.technicianId) === null || _a === void 0 ? void 0 : _a.toString()));
    });
    socket.on("POSITION-CHANGE-ROOM-DATA-CHANGE", function (payload) {
        var _a;
        console.log("POSITION-CHANGE-ROOM-DATA-CHANGE", payload);
        Io.of("/position")
            .to("POSITION-CHANGE-ROOM-".concat((_a = payload === null || payload === void 0 ? void 0 : payload.technicianId) === null || _a === void 0 ? void 0 : _a.toString()))
            .emit("POSITION-CHANGE-ROOM-DATA-CHANGE", payload);
    });
}; });
