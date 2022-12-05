"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = void 0;
var mongoose_1 = require("mongoose");
var wishListSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
    },
}, { timestamps: true });
exports.WishListModel = (0, mongoose_1.model)("Wishlist", wishListSchema);
