const router = require("express").Router();
const { addCurrency, getCurrencies, updateCurrency, deleteCurrency } = require("../controller/currencyController");

router.route("/").get(getCurrencies).post(addCurrency);
router.route("/:id").put(updateCurrency).delete(deleteCurrency);

module.exports = router;
