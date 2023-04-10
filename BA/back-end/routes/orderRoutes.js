const express = require("express");
const router = express.Router();
const {
    getOrders,
    createOrder,
    getOrder,
    deleteOrder
} = require("../controllers/orderController");

const validateToken = require("../middleware/validateTokenHandler");
router.use(validateToken);

router.route("/").get(getOrders).post(createOrder);
router.route("/:id").get(getOrder).delete(deleteOrder);

module.exports = router;