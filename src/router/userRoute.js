const express = require('express');
const { registerUser, getUsers, updateUser, deleteUser, singleUser, sendUsersData } = require('../controller/controller');
const router = express.Router();

router.route("/new/user").post(registerUser);
router.route("/users").get(getUsers)
router.route("/user/:id")
.get(singleUser)
.put(updateUser)
.delete(deleteUser);

router.route("/send/mail").post(sendUsersData);

module.exports = router; 