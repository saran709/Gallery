"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
async function startConnection() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/mean-gallery';
    await mongoose_1.connect(mongoUri, {
        useNewUrlParser: true,
        useFindAndModify: false
    });
    console.log('Database is connected');
}
exports.startConnection = startConnection;
