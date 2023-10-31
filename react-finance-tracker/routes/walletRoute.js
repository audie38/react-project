const router = require("express").Router();
const protect = require("../middleware/authHandler");

const { createWallet, getWallets, getWalletById, updateWallet, deleteWallet } = require("../controller/walletController");

router.route("/").get(protect, getWallets).post(protect, createWallet);
router.route("/:id").get(protect, getWalletById).put(protect, updateWallet).delete(protect, deleteWallet);

module.exports = router;
