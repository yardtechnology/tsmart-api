import admin from "firebase-admin";
const adminService = require("../../../bevol-7455a-firebase-adminsdk-n8mab-cb96407494.json");
admin.initializeApp({
  credential: admin.credential.cert(adminService),
});

export default admin;
