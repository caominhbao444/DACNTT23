const express = require("express");
const router = express.Router();
const{
createMessage,
getMessage,
testm
} = require("../controllers/messageController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/test").get(testm);

router.route("/:id").post(createMessage);

router.route("/:id").get(getMessage);


module.exports = router;